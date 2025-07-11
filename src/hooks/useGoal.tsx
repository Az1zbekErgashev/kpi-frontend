import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useQueryApiClient from 'utils/useQueryApiClient';

interface initialQuery {
  name?: string;
  IsDeleted?: string | number;
  pageIndex: number;
  pageSize: number;
  year?: number;
}
export function useGoal() {
  const [queryParams, setQueryParams] = useState<initialQuery | null>({ pageIndex: 1, pageSize: 10 });
  const params = useParams();
  const navigate = useNavigate();
  const { data: goalByUserId, refetch: getGoalByUserId } = useQueryApiClient({
    request: {
      url: `/api/goal/by-user-id/${params.id}/${params.year}`,
      method: 'GET',
    },
  });

  const { data: ceoGoal } = useQueryApiClient({
    request: {
      url: `/api/goal/ceo-goal/${params.year || queryParams?.year}`,
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

  const { data: rommAndTeam } = useQueryApiClient({
    request: {
      url: `/api/goal/team-by-id?id=${params.id}`,
      method: 'GET',
    },
    onError(error) {
      if (error.error == 'team_not_found') navigate('/');
    },
  });

  return {
    goalByUserId,
    setQueryParams,
    ceoGoal,
    updateGoal,
    createGoalFromCeo,
    createGoalFromTeam,
    rommAndTeam,
  };
}
