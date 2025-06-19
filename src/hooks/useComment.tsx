import React from 'react';
import { useNavigate } from 'react-router-dom';
import useQueryApiClient from 'utils/useQueryApiClient';

export function useComment() {
  const navigate = useNavigate();
  const { appendData: sendRequestStatus } = useQueryApiClient({
    request: {
      url: '/api/goal/change-goal-status',
      method: 'PUT',
    },
    onSuccess() {
      navigate(-1);
    },
  });
  return { sendRequestStatus };
}
