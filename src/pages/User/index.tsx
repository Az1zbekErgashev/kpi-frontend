import { UserAction, UsersFilter, UsersList } from 'components';
import { useUsers } from 'hooks/useUser';
import React, { useState } from 'react';

export function User() {
  const { users, setQueryParams } = useUsers();
  const [actionModalConfig, setActionModalConfig] = useState<{
    open: boolean;
    user?: any;
    type: 'ADD' | 'EDIT' | 'VIEW';
    title: string;
  }>({ open: false, type: 'ADD', title: '' });

  const handleValueChange = (value: any) => {
    setQueryParams((prev: any) => ({
      ...prev,
      ...value,
    }));
  };

  const handleClose = () => {
    setActionModalConfig({ open: false, title: '', type: 'ADD' });
  };

  return (
    <div>
      <UsersFilter setActionModalConfig={setActionModalConfig} handleValueChange={handleValueChange} />
      <UsersList setActionModalConfig={setActionModalConfig} users={users?.data?.items} />
      <UserAction handleClose={handleClose} {...actionModalConfig} />
    </div>
  );
}
