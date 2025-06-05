import { RoomAction, RoomFilter, RoomList } from 'components';
import { useRooms } from 'hooks/useRoom';
import { TFunction } from 'i18next';
import React, { useState } from 'react';
import { ConfirmModal } from 'ui';

const createModalConfig = (t: TFunction, onConfirm: () => void, onCancel: () => void) => ({
  cancelText: t('cancel'),
  confirmText: t('delete'),
  title: t('delete_room_title'),
  content: t('delete_room_description'),
  open: true,
  onConfirm,
  onCancel,
});

export function Room() {
  const roomHook = useRooms();
  const [actionModalConfig, setActionModalConfig] = useState<{
    open: boolean;
    room?: any;
    type: 'ADD' | 'EDIT' | 'VIEW';
    title: string;
  }>({ open: false, type: 'ADD', title: '' });
  const [coniformModal, setConiformModal] = useState<any>(null);

  const handleValueChange = (value: any) => {
    roomHook.setQueryParams((prev: any) => ({
      ...prev,
      ...value,
    }));
  };

  const handleClose = () => {
    setActionModalConfig({ open: false, title: '', type: 'ADD' });
  };

  const handleOpenConfirmModal = (t: TFunction, id: number) => {
    setConiformModal(
      createModalConfig(
        t,
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
