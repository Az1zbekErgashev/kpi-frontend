import { UserAction, UsersFilter, UsersList } from 'components';
import { useUsers } from 'hooks/useUser';
import { TFunction } from 'i18next';
import React, { useState } from 'react';
import { ConfirmModal, ScrollWithShift } from 'ui';
import Pagination from 'ui/Pagination/Pagination';

const createModalConfig = (t: TFunction, onConfirm: () => void, onCancel: () => void) => ({
  cancelText: t('cancel'),
  confirmText: t('delete'),
  title: t('delete_user_title'),
  content: t('delete_user_description'),
  open: true,
  onConfirm,
  onCancel,
});

export function User() {
  const hookUser = useUsers();
  const [actionModalConfig, setActionModalConfig] = useState<{
    open: boolean;
    user?: any;
    type: 'ADD' | 'EDIT' | 'VIEW';
    title: string;
  }>({ open: false, type: 'ADD', title: '' });
  const [coniformModal, setConiformModal] = useState<any>(null);

  const handleValueChange = (value: any) => {
    hookUser.setQueryParams((prev: any) => ({
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
          hookUser.handleDelete(id);
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
      <UsersFilter setActionModalConfig={setActionModalConfig} handleValueChange={handleValueChange} />
      <div className="scroll-wrapp">
        <ScrollWithShift />
      </div>

      <UsersList
        handleOpenConfirmModal={handleOpenConfirmModal}
        setActionModalConfig={setActionModalConfig}
        users={hookUser.users?.data?.items}
      />
      <Pagination
        total={hookUser.users?.data?.totalItems}
        pageSize={hookUser.users?.data?.itemsPerPage}
        onChange={hookUser.handlePaginationChange}
        hideOnSinglePage={true}
        current={hookUser.users?.data?.PageIndex}
      />
      <UserAction {...hookUser} handleClose={handleClose} {...actionModalConfig} />
      {coniformModal && <ConfirmModal {...coniformModal} />}
    </div>
  );
}
