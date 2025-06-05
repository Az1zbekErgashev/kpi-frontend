import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HomeAction, HomeFilter, HomeList, RoomList } from 'components';
import { useHome } from 'hooks/useHome';
import useQueryApiClient from 'utils/useQueryApiClient';
import { Button, Modal } from 'ui';
import { TFunction } from 'i18next';

interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  userName: string;
  fullName: string;
  role: 'Ceo' | 'Director' | 'TeamLead' | 'TeamMember';
  teamId: number;
  roomId: number;
  team: string;
  room: string;
  isDeleted: number;
}

interface Room {
  id: number;
  createdAt: string;
  name: string;
  teamsCount: number;
  isDeleted: number;
}

interface Team {
  id: number;
  name: string;
}

interface FilterInitialQuery {
  Year?: string;
  RoomId?: number;
  TeamId?: number;
  UserName?: string;
  PageIndex: number;
  PageSize: number;
}

interface RoomApiResponse {
  status: boolean;
  error: string;
  data: Room[];
  global: boolean;
}

interface TeamApiResponse {
  status: boolean;
  error: string;
  data: Team[];
  global: boolean;
}

const mockRooms: Room[] = [
  { id: 1, createdAt: '2025-01-01', name: 'Room A', teamsCount: 2, isDeleted: 0 },
  { id: 2, createdAt: '2025-01-01', name: 'Room B', teamsCount: 1, isDeleted: 0 },
];

const mockTeams: Team[] = [
  { id: 1, name: 'Team Alpha' },
  { id: 2, name: 'Team Beta' },
];

export function Home() {
  const { t } = useTranslation();
  const { users, isLoading, isError, setQueryParams, refetchUsers } = useHome();
  const [actionModalConfig, setActionModalConfig] = useState<{
    open: boolean;
    user?: User;
    room?: Room;
    type: 'ADD' | 'EDIT' | 'VIEW';
    title: string;
  }>({ open: false, type: 'ADD', title: t('add_user') });
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    title: string;
    content: string;
    onConfirm: () => void;
    onCancel: () => void;
  } | null>(null);

  // Fetch rooms
  const { data: roomsResponse } = useQueryApiClient({
    request: {
      url: '/api/rooms',
      method: 'GET',
      headers: { Authorization: `Bearer <your-token>` },
    },
  });

  // Fetch teams
  const { data: teamsResponse } = useQueryApiClient({
    request: {
      url: '/api/teams',
      method: 'GET',
      headers: { Authorization: `Bearer <your-token>` },
    },
  });

  const rooms = roomsResponse?.data || mockRooms;
  const teams = teamsResponse?.data || mockTeams;

  React.useEffect(() => {
    if (isError) {
      console.error(t('fetch_users_error'), isError);
    }
  }, [isError, t]);

  const handleValueChange = (value: Partial<FilterInitialQuery>) => {
    setQueryParams((prev) => ({
      ...prev,
      ...value,
      PageIndex: value.PageIndex || prev?.PageIndex || 1,
    }));
  };

  const handleClose = () => {
    setActionModalConfig({ open: false, title: '', type: 'ADD', user: undefined, room: undefined });
  };

  const createUser = async (data: any) => {
 useQueryApiClient({
      request: {
        url: '/api/user/create',
        method: 'POST',
        data,
      },
    });
    refetchUsers();
  };

  const updateUser = async (data: any) => {
    await useQueryApiClient({
      request: {
        url: `/api/user/${data.id}`,
        method: 'PUT',
        data,
        headers: { Authorization: `Bearer <your-token>` },
      },
    });
    refetchUsers();
  };

  const handleOpenConfirmModal = (t: TFunction, type: 'DELETE' | 'RECOVER', id: number) => {
    setConfirmModal({
      open: true,
      title: t(type === 'DELETE' ? 'delete_room' : 'recover_room'),
      content: t(type === 'DELETE' ? 'delete_room_confirm' : 'recover_room_confirm'),
      onConfirm: async () => {
        await useQueryApiClient({
          request: {
            url: `/api/rooms/${id}`,
            method: type === 'DELETE' ? 'DELETE' : 'PATCH',
            headers: { Authorization: `Bearer <your-token>` },
          },
        });
        setConfirmModal(null);
      },
      onCancel: () => setConfirmModal(null),
    });
  };

  return (
    <div style={{ padding: 16 }}>
      <Button
        type="primary"
        onClick={() => setActionModalConfig({ open: true, type: 'ADD', title: t('add_user') })}
      />
      
      <HomeFilter setActionModalConfig={setActionModalConfig} handleValueChange={handleValueChange} />
      <HomeList
        setActionModalConfig={setActionModalConfig}
        users={users}
        rooms={rooms}
        teams={teams}
        filterQuery={users.queryParams || { PageIndex: 1, PageSize: 10 }}
        setFilterQuery={setQueryParams}
      />
      <RoomList
        rooms={rooms}
        setActionModalConfig={setActionModalConfig}
        handleOpenConfirmModal={handleOpenConfirmModal}
      />
      <HomeAction
        open={actionModalConfig.open}
        user={actionModalConfig.user}
        type={actionModalConfig.type}
        title={actionModalConfig.title}
        handleClose={handleClose}
        handleCreateUser={createUser}
        handleUpdateUser={updateUser}
        users={users}
        roomData={rooms}
        teamData={teams}
        setQueryParams={setQueryParams}
      />
      {confirmModal && (
        <Modal
          open={confirmModal.open}
          title={confirmModal.title}
          onOk={confirmModal.onConfirm}
          onCancel={confirmModal.onCancel}
          okText={t('confirm')}
          cancelText={t('cancel')}
        >
          <p>{confirmModal.content}</p>
        </Modal>
      )}
    </div>
  );
}