import { useEffect, useState } from 'react';
import { smoothScroll } from 'utils/globalFunctions';
import useQueryApiClient from 'utils/useQueryApiClient';

interface initialQuery {
  name?: string;
  IsDeleted?: string | number;
  pageIndex: number;
  pageSize: number;
  userName?: string;
  teamId?: string;
  roomId?: string;
  year?: string;
}

interface initialQueryForPerformance {
  pageIndex: number;
  pageSize: number;
  year?: number;
  month?: number;
  userId?: number;
}

export function useTeamLeaders() {
  const [queryParams, setQueryParams] = useState<initialQuery | null>({ pageIndex: 1, pageSize: 10 });
  const [queryParamsForPerformance, setQueryParamsForPerformance] = useState<initialQueryForPerformance | null>({
    pageIndex: 1,
    pageSize: 10,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const { data: teamLeaders, refetch: refetchUsers } = useQueryApiClient({
    request: {
      url: `/api/user/filter-ceo`,
      method: 'GET',
      data: queryParams,
      disableOnMount: true,
    },
  });
  const { data: rooms } = useQueryApiClient({
    request: {
      url: `/api/room/filter`,
      method: 'GET',
      data: { IsDeleted: 0, PageIndex: 1, PageSize: 100 },
    },
  });
  const { data: teams } = useQueryApiClient({
    request: {
      url: `/api/team/filter`,
      method: 'GET',
      data: { IsDeleted: 0, PageIndex: 1, PageSize: 100 },
    },
  });

  const { data: monthlyData, refetch: getMonthly } = useQueryApiClient({
    request: {
      url: '/api/monthlytarget/list-ceo',
      method: 'GET',
      data: queryParamsForPerformance,
    },
  });

  useEffect(() => {
    refetchUsers();
  }, [queryParams]);

  useEffect(() => {
    getMonthly();
  }, [queryParamsForPerformance]);

  const handlePaginationChange = (page: number, pageSize: number) => {
    smoothScroll('top', 0);
    setQueryParams((res) => ({ ...res, pageIndex: page, pageSize: pageSize }));
  };

  return {
    refetchUsers,
    setQueryParams,
    teamLeaders,
    rooms,
    teams,
    handlePaginationChange,
    setQueryParamsForPerformance,
    monthlyData,
  };
}
