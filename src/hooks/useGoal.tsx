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

  console.log(params);

  const { data: goalByUserId } = useQueryApiClient({
    request: {
      url: `/api/goal/by-userid/${params.id}/${params.year}`,
      method: 'GET',
    },
  });
  const { data: ceoGoal } = useQueryApiClient({
    request: {
      url: `/api/goal/ceo-goal/${params.year}`,
      method: 'GET',
    },
  });

  return {
    goalByUserId,
    setQueryParams,
    ceoGoal,
  };
}
