import { useEffect, useState } from 'react';
import { smoothScroll } from 'utils/globalFunctions';
import useQueryApiClient from 'utils/useQueryApiClient';
import { Notification } from 'ui';
import { t } from 'i18next';

interface initialQuery {
  name?: string;
  IsDeleted?: string | number;
  pageIndex: number;
  pageSize: number;
}
export function useRooms() {
  const [queryParams, setQueryParams] = useState<initialQuery | null>({ pageIndex: 1, pageSize: 10 });
  const [roomId, setRoomId] = useState<number | null>(null);

  const { appendData: createRoom } = useQueryApiClient({
    request: {
      url: `/api/room/create`,
      method: 'POST',
    },
    onSuccess() {
      refetchRooms();
    },
  });

  const { refetch: deleteRoom } = useQueryApiClient({
    request: {
      url: `/api/room/${roomId}`,
      method: 'DELETE',
    },
    onSuccess() {
      Notification({ text: t('room_deleted'), type: 'success' });
      refetchRooms();
    },
  });

  const { appendData: updateRoom } = useQueryApiClient({
    request: {
      url: `/api/room/update`,
      method: 'PUT',
    },
    onSuccess() {
      refetchRooms();
    },
  });

  const { data: rooms, refetch: refetchRooms } = useQueryApiClient({
    request: {
      url: `/api/room/filter`,
      method: 'GET',
      data: queryParams,
      disableOnMount: true,
    },
  });

  const handleDelete = (roomId: number | null) => {
    setRoomId(roomId);
  };

  useEffect(() => {
    refetchRooms();
  }, [queryParams]);

  useEffect(() => {
    if (roomId) deleteRoom();

    setRoomId(null);
  }, [roomId]);

  const handlePaginationChange = (page: number, pageSize: number) => {
    smoothScroll('top', 0);
    setQueryParams((res) => ({ ...res, pageIndex: page, pageSize: pageSize }));
  };

  return {
    createRoom,
    handleDelete,
    updateRoom,
    refetchRooms,
    setQueryParams,
    rooms,
    handlePaginationChange,
  };
}
