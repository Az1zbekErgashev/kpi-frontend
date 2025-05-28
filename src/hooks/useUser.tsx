import { useEffect, useState } from 'react';
import useQueryApiClient from 'utils/useQueryApiClient';

interface initialQuery {
  text?: string;
  IsDeleted?: string | number;
  pageIndex: number;
  pageSize: number;
}
export function useUsers() {
  const [queryParams, setQueryParams] = useState<initialQuery | null>({ pageIndex: 1, pageSize: 10 });
  const [userId, setUserId] = useState<number | null>(null);

  const { appendData: createUser } = useQueryApiClient({
    request: {
      url: `/api/user/create`,
      method: 'POST',
    },
    onSuccess() {
      refetchUsers();
    },
  });

  const { refetch: deleteUser } = useQueryApiClient({
    request: {
      url: `/api/user/${userId}`,
      method: 'DELETE',
    },
    onSuccess() {
      refetchUsers();
    },
  });

  const { appendData: updateUser } = useQueryApiClient({
    request: {
      url: `/api/user/update`,
      method: 'PUT',
    },
    onSuccess() {
      refetchUsers();
    },
  });

  const { data: users, refetch: refetchUsers } = useQueryApiClient({
    request: {
      url: `/api/user/filter`,
      method: 'GET',
      data: queryParams,
      disableOnMount: true,
    },
  });

  const { data: roomData } = useQueryApiClient({
    request: {
      url: '/api/room/list',
    },
  });

  const { data: teamData } = useQueryApiClient({
    request: {
      url: '/api/team/list',
    },
  });

  const handleDelete = (userId: number | null) => {
    setUserId(userId);
  };

  useEffect(() => {
    refetchUsers();
  }, [queryParams]);

  useEffect(() => {
    if (userId) deleteUser();

    setUserId(null);
  }, [userId]);

  return {
    createUser,
    handleDelete,
    updateUser,
    refetchUsers,
    setQueryParams,
    users,
    roomData,
    teamData,
  };
}
