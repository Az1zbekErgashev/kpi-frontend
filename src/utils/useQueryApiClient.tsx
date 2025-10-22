import { useNavigate } from 'react-router-dom';
import useHandleError from './useHandleError';
import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import useJwt from './useJwt';
import Cookies from 'js-cookie';
import { routes } from '../config/config';

interface InvalidRequestResponse {
  status_code: number;
  message: string;
}

interface RequestProps {
  url: string;
  data?: any;
  params?: any; // Added params property
  method?: RequestMethod;
  mustRetry?: boolean;
  multipart?: boolean;
  enableOnMount?: boolean;
  disableOnMount?: boolean;
  baseUrl?: string;
  headers?: Record<string, string>;
}

interface UseQueryApiClientProps {
  request: RequestProps;
  onSuccess?: (response: any, passOnSuccess?: any) => void;
  onError?: (response: any) => void;
  onFinally?: () => void;
  enabled?: boolean;
}

interface ErrorProps {
  data: any;
  error: string;
  global?: boolean;
}

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

function useQueryApiClient({ request, onSuccess, onError, onFinally, enabled = true }: UseQueryApiClientProps) {
  const method = request?.method || 'GET';
  const [receivedData, setReceivedData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(enabled ? method === 'GET' && !request?.disableOnMount : false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isRefetching, setIsRefetching] = useState<boolean>(false);
  const [timeZone, setTimeZone] = useState<string>('');
  const { getHeader } = useJwt();

  const navigate = useNavigate();
  const getToken = getHeader();
  const [handleError] = useHandleError();

  const enableOnMount = request?.enableOnMount;
  const disableOnMount = request?.disableOnMount;

  useEffect(() => {
    if (!disableOnMount && (enableOnMount || method === 'GET')) {
      actualCall(
        request.url,
        request?.data,
        request?.method,
        request?.mustRetry,
        request?.multipart,
        {},
        request.baseUrl
      );
    }
  }, [
    enabled,
    disableOnMount,
    enableOnMount,
    request.url,
    request.method,
    request.mustRetry,
    request.multipart,
    request.baseUrl,
  ]); // Added dependencies to prevent stale closures

  useEffect(() => {
    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone) {
      setTimeZone(timeZone);
    }
  }, []);

  const refetch = () => {
    setIsRefetching(true);
    actualCall(request.url, request?.data, method, request?.mustRetry, request?.multipart, {}, request.baseUrl);
  };

  const parsedError = (response: InvalidRequestResponse) => {
    return {
      status: response.status_code,
      message: response.message,
    };
  };

  const appendData = (data?: any, urlParams?: any, passOnSuccess?: any) => {
    let url = request.url;
    if (urlParams) {
      Object.entries(urlParams).forEach((entry: any) => {
        const key = entry[0];
        const value = entry[1];
        url = url.replace(':' + key, value);
      });
    }

    actualCall(url, data, request?.method, request?.mustRetry, request?.multipart, passOnSuccess, request.baseUrl);
  };

  const actualCall = async (
    url: string,
    data: any = {},
    method: RequestMethod = 'GET',
    mustRetry: boolean = true,
    multipart: boolean = false,
    passOnSuccess: any = {},
    baseUrl: string = ''
  ) => {
    if (!enabled) {
      return;
    }

    setIsLoading(true);

    const requestConfig: AxiosRequestConfig = {
      url: url,
      method: method,
      baseURL: baseUrl || routes.api.baseUrl,
      responseType: multipart ? 'blob' : 'json',
      paramsSerializer: {
        indexes: true,
      },
      headers: {
        Authorization: getToken,
        'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
        'X-FRONTEND-ROUTE': window.location.pathname,
        ...request.headers,
        TimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    // Set params or data based on method
    if (method === 'GET') {
      requestConfig.params = request.params || data; // Use params if provided, else fallback to data
    } else {
      requestConfig.data = data;
    }

    try {
      const response = await axios.request(requestConfig);
      const responseContent = response.data;

      if (responseContent && responseContent.status_code > 299) {
        throw parsedError(responseContent);
      }

      setReceivedData(responseContent);
      setIsSuccess(true);
      onSuccess && onSuccess(responseContent, passOnSuccess);

      return responseContent;
    } catch (e: any) {
      const response = e.response;
      console.error(e);

      if (response?.status === 401) {
        navigate('/', { replace: true });
        Cookies.remove('jwt');
      }

      if (response?.status === 403) {
        navigate('/for-employers/login', { replace: true });
      }

      if (response?.status >= 500 && window.runConfig.nodeEnv === 'production') {
        navigate('/500');
      }

      setIsError(true);
      let actualError: ErrorProps;
      if (e.response && e.response.data instanceof Blob) {
        const blobData = await e.response.data.text();
        const jsonData = JSON.parse(blobData);
        actualError = {
          data: jsonData,
          error: jsonData.errors && jsonData.errors.join(', '),
          global: jsonData.global,
        };
      } else {
        if (typeof response === 'object' && response.hasOwnProperty('data')) {
          actualError = response.data;
        } else {
          actualError = e;
        }
      }

      onError && onError(actualError);
      handleError(actualError);
    } finally {
      onFinally && onFinally();
      setIsRefetching(false);
      setIsLoading(false);
    }
  };

  return {
    data: receivedData,
    isLoading: isLoading,
    isSuccess: isSuccess,
    refetch: refetch,
    isError: isError,
    isRefetching: isRefetching,
    appendData: appendData,
  };
}

export default useQueryApiClient;
