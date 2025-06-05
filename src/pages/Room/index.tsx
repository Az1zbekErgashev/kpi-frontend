import { RoomAction, RoomFilter, RoomList } from 'components';
import { useRooms } from 'hooks/useRoom';
import { TFunction } from 'i18next';
import React, { useState } from 'react';
import { ConfirmModal } from 'ui';

interface ConfirmModalConfig {
  isDelete: 'DELETE' | 'RECOVER';
  cancelText: string;
  confirmText: string;
  title: string;
  content: string;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const createModalConfig = (
  t: TFunction,
  isDelete: 'DELETE' | 'RECOVER',
  onConfirm: () => void,
  onCancel: () => void
): ConfirmModalConfig => ({
  isDelete,
  cancelText: t('cancel'),
  confirmText: t(isDelete === 'DELETE' ? 'delete' : 'recover'),
  title: t(isDelete === 'DELETE' ? 'delete_team_title' : 'recover_team_title'),
  content: t(isDelete === 'DELETE' ? 'delete_team_description' : 'recover_team_description'),
  open: true,
  onConfirm,
  onCancel,
});

export function Room() {
  const roomHook = useRooms();
  const [coniformModal, setConiformModal] = useState<ConfirmModalConfig | null>(null);
  const [actionModalConfig, setActionModalConfig] = useState<{
    open: boolean;
    room?: any;
    type: 'ADD' | 'EDIT' | 'VIEW';
    title: string;
  }>({ open: false, type: 'ADD', title: '' });

  const handleValueChange = (value: any) => {
    roomHook.setQueryParams((prev: any) => ({
      ...prev,
      ...value,
    }));
  };

  const handleOpenConfirmModal = (t: TFunction, type: 'DELETE' | 'RECOVER', id: number) => {
    setConiformModal(
      createModalConfig(
        t,
        type,
        () => {
          roomHook.handleDelete(id);
          setConiformModal(null); 
        },
        () => {
          setConiformModal(null); 
        }
      )
    );
  };

  const handleClose = () => {
    setActionModalConfig({ open: false, title: '', type: 'ADD' });
  };

  return (
    <div>
      <RoomFilter handleValueChange={handleValueChange} setActionModalConfig={setActionModalConfig} />
      <RoomList
        handleOpenConfirmModal={handleOpenConfirmModal}
        rooms={roomHook.rooms?.data?.items}
        setActionModalConfig={setActionModalConfig}
      />
      <RoomAction {...roomHook} handleClose={handleClose} {...actionModalConfig} />
      {coniformModal && <ConfirmModal {...coniformModal} />}
    </div>
  );
}