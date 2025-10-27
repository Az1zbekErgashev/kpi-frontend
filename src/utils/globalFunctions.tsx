import { notification } from 'antd';
import { routes } from '../config/config';
import dayjs from 'dayjs';
import { NavigateFunction } from 'react-router-dom';
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const formatDate = (date: string) => (date ? dayjs(date).format('DD.MM.YYYY') : null);

export const checkEmail = async (email: string) => {
  try {
    const response = await fetch(`${routes.api.baseUrl}/api/auth/CheckEmail?email=${email}`);
    return response.status === 200;
  } catch (err) {
    console.log('err', err);
  }
};

export const updateSearchParams = (
  navigate: NavigateFunction,
  pathname: string,
  currentSearchParams: URLSearchParams,
  newParams: Record<string, string | undefined>
) => {
  const updatedSearchParams = new URLSearchParams(currentSearchParams);
  Object.entries(newParams).forEach(([key, value]) => {
    if (value) {
      updatedSearchParams.set(key, value);
    } else {
      updatedSearchParams.delete(key);
    }
  });
  navigate(`${pathname}?${updatedSearchParams.toString()}`);
};

export const validateOnlyNumber = (t: any, value: string) => {
  const nameRegex = /^-?\d+$/;

  if (value && !nameRegex.test(value)) {
    return Promise.reject(new Error(t('only_number')));
  }

  return Promise.resolve();
};

export const openNotification = (
  type: 'success' | 'info' | 'warning' | 'error',
  description?: string,
  message?: string
) => {
  return notification[type]({
    message: message,
    description: description,
  });
};

type ScrollType = 'top' | 'left' | 'right' | 'bottom';

export const smoothScroll = (
  type: ScrollType,
  value: number = 0,
  behavior: 'auto' | 'instant' | 'smooth' = 'smooth'
): void => {
  const scrollOptions: ScrollToOptions = {
    behavior: behavior,
  };

  switch (type.toLowerCase()) {
    case 'top':
      scrollOptions.top = value;
      break;
    case 'left':
      scrollOptions.left = value;
      break;
    case 'right':
      scrollOptions.left = value;
      break;
    case 'bottom':
      scrollOptions.top = document.documentElement.scrollHeight - window.innerHeight;
      break;
    default:
      throw new Error('Invalid scroll type');
  }
  window.scrollTo(scrollOptions);
};

export const validateName = (t: any, value: string) => {
  //@ts-ignore
  const nameRegex = /^[\p{L}\p{M}\s.,'-]+$/u;

  if (value && !nameRegex.test(value)) {
    return Promise.reject(new Error(t('invalidNameInputError')));
  }

  return Promise.resolve();
};

export const validateNumber = (t: any, value: string) => {
  const numberRegex = /^\d+$/;

  if (value && !numberRegex.test(value)) {
    return Promise.reject(new Error(t('invalidNumberInputError')));
  }

  return Promise.resolve();
};

export const validatePhoneNumber = (t: any, value: string) => {
  const numberRegex = /^\+?\d+[-\d]*$/;

  if (value && !numberRegex.test(value)) {
    return Promise.reject(new Error(t('InvalidPhoneNumberError')));
  }

  if (value && value.length < 7) {
    return Promise.reject(new Error(t('InvalidPhoneNumberError')));
  }

  return Promise.resolve();
};

export const validateEmail = (t: any, value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value && !emailRegex.test(value)) {
    return Promise.reject(new Error(t('InvalidEmailAddreesError')));
  }

  if (value) {
    const [, domain] = value.split('@');
    const [domainName] = domain.split('.');
    if (domainName.length < 2) {
      return Promise.reject(new Error(t('InvalidEmailAddreesError')));
    }
  }

  return Promise.resolve();
};

export const disabledDate = (current: any, dateFieldName: any, form: any) => {
  const dateTo = form.getFieldValue('dateTo');
  const dateFrom = form.getFieldValue('dateFrom');

  if (dateFieldName === 'dateFrom') {
    return dateTo && current.isAfter(dateTo, 'day');
  }

  if (dateFieldName === 'dateTo') {
    return dateFrom && current.isBefore(dateFrom, 'day');
  }

  return false;
};

export const htmlToText = (html: string) => {
  if (html) {
    return html.replace(/<br\s*\/?>/gi, '\n');
  }
};

export const textToHtml = (text: string) => {
  if (text) {
    return text.replace(/\n/g, '<br>');
  }
};

export const parseDate = (dateString: string) => {
  const [datePart, timePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('.').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);

  return new Date(year, month - 1, day, hours, minutes);
};

export const separateIntegratedString = (string: string | null) => {
  return string?.replace(/([A-Z][a-z]*)/g, ' $1').trim();
};

interface SyncPaginationParams {
  totalItems: number;
  itemsPerPage: number;
  currentPageIndex: number;
  deletedCount: number;
  setSearchParams: (params: Record<string, string>) => void;
  setQueryParams: (callback: (prev: any) => any) => void;
  pageSize?: number;
}

export function syncPaginationAfterDelete({
  totalItems,
  itemsPerPage,
  currentPageIndex,
  deletedCount,
  setSearchParams,
  setQueryParams,
  pageSize = 10,
}: SyncPaginationParams) {
  const totalItemsAfterDelete = totalItems - deletedCount;
  const totalPagesAfterDelete = Math.ceil(totalItemsAfterDelete / itemsPerPage);
  const newPageIndex = Math.min(currentPageIndex, totalPagesAfterDelete || 1);

  setSearchParams({
    pageIndex: newPageIndex.toString(),
    pageSize: pageSize.toString(),
  });

  setQueryParams((prev: any) => ({
    ...prev,
    PageIndex: newPageIndex,
  }));
}
