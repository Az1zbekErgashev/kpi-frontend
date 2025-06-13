import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useQueryApiClient from 'utils/useQueryApiClient';

interface initialQuery {
  name?: string;
  IsDeleted?: string | number;
  pageIndex: number;
  pageSize: number;
}
export function useGoal() {
  const [queryParams, setQueryParams] = useState<initialQuery | null>({ pageIndex: 1, pageSize: 10 });
  const params = useParams();

  const { data: goalByUserId, refetch: getGoalByUserId } = useQueryApiClient({
    request: {
      url: `/api/goal/by-team/${params.id}/${params.year}`,
      method: 'GET',
    },
  });
  const { data: ceoGoal } = useQueryApiClient({
    request: {
      url: `/api/goal/ceo-goal/${params.year}`,
      method: 'GET',
    },
  });

  const { appendData: createGoalFromTeam } = useQueryApiClient({
    request: {
      url: '/api/goal/create-from-team',
      method: 'POST',
    },
  });

  const { appendData: createGoalFromCeo } = useQueryApiClient({
    request: {
      url: '/api/goal/create-from-ceo',
      method: 'POST',
    },
  });

  const { appendData: updateGoal } = useQueryApiClient({
    request: {
      url: '/api/goal/update',
      method: 'PUT',
    },
    onSuccess() {
      getGoalByUserId();
    },
  });

  const {} = useQueryApiClient({
    request: {
      url: '',
    },
  });

  return {
    goalByUserId,
    setQueryParams,
    ceoGoal,
    updateGoal,
    createGoalFromCeo,
    createGoalFromTeam,
  };
}
