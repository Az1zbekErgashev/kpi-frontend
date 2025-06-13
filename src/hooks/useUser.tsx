import { useEffect, useState } from 'react';
import useQueryApiClient from 'utils/useQueryApiClient';
import { Notification } from 'ui';
import { useTranslation } from 'react-i18next';
import { smoothScroll } from 'utils/globalFunctions';
interface initialQuery {
  text?: string;
  IsDeleted?: string | number;
  pageIndex: number;
  pageSize: number;
}
export function useUsers() {
  const [queryParams, setQueryParams] = useState<initialQuery | null>({ pageIndex: 1, pageSize: 10 });
  const [userId, setUserId] = useState<number | null>(null);
  const { t } = useTranslation();

  const { appendData: createUser } = useQueryApiClient({
    request: {
      url: `/api/user/create`,
      method: 'POST',
    },
    onSuccess() {
      refetchUsers();
    },
    onError(error) {
      Notification({ type: 'error', text: t(error.error) });
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
    onError(error) {
      Notification({ type: 'error', text: t(error.error) });
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

  const { data: positions } = useQueryApiClient({
    request: {
      url: '/api/user/position',
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

  const handlePaginationChange = (page: number, pageSize: number) => {
    smoothScroll('top', 0);
    setQueryParams((res) => ({ ...res, pageIndex: page, pageSize: pageSize }));
  };

  return {
    createUser,
    handleDelete,
    updateUser,
    refetchUsers,
    setQueryParams,
    users,
    roomData,
    teamData,
    positions,
    handlePaginationChange,
  };
}
