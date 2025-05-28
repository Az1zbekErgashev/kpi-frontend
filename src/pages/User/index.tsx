import { UserAction, UsersFilter, UsersList } from 'components';
import { useUsers } from 'hooks/useUser';
import React, { useState } from 'react';

export function User() {
  const hookUser = useUsers();
  const [actionModalConfig, setActionModalConfig] = useState<{
    open: boolean;
    user?: any;
    type: 'ADD' | 'EDIT' | 'VIEW';
    title: string;
  }>({ open: false, type: 'ADD', title: '' });

  const handleValueChange = (value: any) => {
    hookUser.setQueryParams((prev: any) => ({
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
      <UsersList setActionModalConfig={setActionModalConfig} users={hookUser.users?.data?.items} />
      <UserAction {...hookUser} handleClose={handleClose} {...actionModalConfig} />
    </div>
  );
}
