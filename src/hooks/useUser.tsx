import { useEffect, useState } from 'react';
import useQueryApiClient from 'utils/useQueryApiClient';

export function useUsers() {
  const [queryParams, setQueryParams] = useState(null);
  const [userId, setUserId] = useState<number | null>(null);

  const { appendData: createUser } = useQueryApiClient({
    request: {
      url: `/api/comment/create/comment`,
      method: 'POST',
    },
    onSuccess() {
      refetchUsers();
    },
  });

  const { refetch: deleteUser } = useQueryApiClient({
    request: {
      url: `/api/comment/delete/comment?id=${userId}`,
      method: 'DELETE',
    },
    onSuccess() {
      refetchUsers();
    },
  });

  const { appendData: updateUser } = useQueryApiClient({
    request: {
      url: `/api/comment/update/comment`,
      method: 'PUT',
    },
    onSuccess() {
      refetchUsers();
    },
  });

  const { data: users, refetch: refetchUsers } = useQueryApiClient({
    request: {
      url: ``,
      method: 'GET',
      data: queryParams,
      disableOnMount: true,
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
  };
}
