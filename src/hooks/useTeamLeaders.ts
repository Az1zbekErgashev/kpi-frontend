import { useEffect, useState } from 'react';
import useQueryApiClient from 'utils/useQueryApiClient';

interface initialQuery {
  name?: string;
  IsDeleted?: string | number;
  pageIndex: number;
  pageSize: number;
  userName?: string;
  teamId?: string;
  roomId?: string;
  year?: number;
}
export function useTeamLeaders() {
  const [queryParams, setQueryParams] = useState<initialQuery | null>({ pageIndex: 1, pageSize: 10 });

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

  useEffect(() => {
    refetchUsers();
  }, [queryParams]);

  return {
    refetchUsers,
    setQueryParams,
    teamLeaders,
    rooms,
    teams,
  };
}
