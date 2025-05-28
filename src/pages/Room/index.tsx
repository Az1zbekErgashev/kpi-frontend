import { RoomAction, RoomFilter, RoomList } from 'components';
import { useRooms } from 'hooks/useRoom';
import React, { useState } from 'react';

export function Room() {
  const roomHook = useRooms();
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

  const handleClose = () => {
    setActionModalConfig({ open: false, title: '', type: 'ADD' });
  };
  return (
    <div>
      <RoomFilter handleValueChange={handleValueChange} setActionModalConfig={setActionModalConfig} />
      <RoomList rooms={roomHook.rooms?.data?.items} setActionModalConfig={setActionModalConfig} />
      <RoomAction {...roomHook} handleClose={handleClose} {...actionModalConfig} />
    </div>
  );
}
