import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Notification } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';

interface initialQuery {
  year?: number;
}

export function useYearlyGoal() {
  const [queryParams, setQueryParams] = useState<initialQuery | null>({});
  const [status, setStatus] = useState<any>();
  const [searcParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const { refetch: getCeoGoal } = useQueryApiClient({
    request: {
      url: `/api/goal/ceo-goal/${queryParams?.year}`,
      method: 'GET',
      disableOnMount: true,
    },
    onSuccess(response) {
      setStatus(response);
    },
    onError() {
      setStatus(undefined);
    },
  });

  const { appendData: createGoalFromCeo } = useQueryApiClient({
    request: {
      url: `/api/goal/create-from-ceo/${searcParams.get('year')}`,
      method: 'POST',
    },
    onSuccess() {
      getCeoGoal();
    },
    onError(error) {
      Notification({ text: t('please_fill_fields'), type: 'error' });
    },
  });

  const { appendData: updateGoal } = useQueryApiClient({
    request: {
      url: '/api/goal/update',
      method: 'PUT',
    },
    onSuccess() {
      getCeoGoal();
      Notification({ text: t('goal_updated_successfully'), type: 'success' });
    },
    onError(error) {
      Notification({ text: t('please_fill_fields'), type: 'error' });
    },
  });

  useEffect(() => {
    if (queryParams?.year) getCeoGoal();
  }, [queryParams]);

  return { createGoalFromCeo, updateGoal, status, setQueryParams };
}
