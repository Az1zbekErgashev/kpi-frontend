import { UsersList } from 'components';
import { useUsers } from 'hooks/useUser';
import React from 'react';

export function User() {
  const { refetchUsers, users } = useUsers();
  return (
    <div>
      <UsersList users={users?.data?.items} />
    </div>
  );
}
