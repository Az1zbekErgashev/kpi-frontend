import { useEffect, useState } from 'react';
import { smoothScroll } from 'utils/globalFunctions';
import useQueryApiClient from 'utils/useQueryApiClient';

interface initialQuery {
  name?: string;
  IsDeleted?: string | number;
  pageIndex: number;
  pageSize: number;
}

export function useTeams() {
  const [queryParams, setQueryParams] = useState<initialQuery | null>({ pageIndex: 1, pageSize: 10 });
  const [teamId, setTeamId] = useState<number | null>(null);

  const { appendData: createTeam } = useQueryApiClient({
    request: {
      url: `/api/team/create`,
      method: 'POST',
    },
    onSuccess() {
      refetchTeams();
    },
  });

  const { refetch: deleteTeam } = useQueryApiClient({
    request: {
      url: `/api/team/${teamId}`,
      method: 'DELETE',
    },
    onSuccess() {
      refetchTeams();
    },
  });

  const { appendData: updateTeam } = useQueryApiClient({
    request: {
      url: `/api/team/update`,
      method: 'PUT',
    },
    onSuccess() {
      refetchTeams();
    },
  });

  const { data: teams, refetch: refetchTeams } = useQueryApiClient({
    request: {
      url: `/api/team/filter`,
      method: 'GET',
      data: queryParams,
      disableOnMount: true,
    },
  });

  const handleDelete = (userId: number | null) => {
    setTeamId(userId);
  };

  useEffect(() => {
    smoothScroll('top', 0);
    refetchTeams();
  }, [queryParams]);

  useEffect(() => {
    if (teamId) deleteTeam();

    setTeamId(null);
  }, [teamId]);

  const handlePaginationChange = (page: number, pageSize: number) => {
    setQueryParams((res) => ({ ...res, pageIndex: page, pageSize: pageSize }));
  };

  return {
    createTeam,
    handleDelete,
    updateTeam,
    refetchTeams,
    setQueryParams,
    teams,
    handlePaginationChange,
  };
}