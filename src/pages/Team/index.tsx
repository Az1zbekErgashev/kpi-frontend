import { TeamAction, TeamFilter, TeamList } from 'components';
import { useTeams } from 'hooks/useTeam';
import { TFunction } from 'i18next';
import React, { useState } from 'react';
import { ConfirmModal } from 'ui';

const createModalConfig = (
  t: TFunction,
  isDelete: 'DELETE' | 'RECOVER',
  onConfirm: () => void,
  onCancel: () => void
) => ({
  isDelete,
  cancelText: t('cancel'),
  confirmText: t(isDelete === 'DELETE' ? 'delete' : 'recover'),
  title: t(isDelete === 'DELETE' ? 'delete_team_title' : 'recover_team_title'),
  content: t(isDelete === 'DELETE' ? 'delete_team_description' : 'recover_team_description'),
  open: true,
  onConfirm,
  onCancel,
});

export function Team() {
  const hookTeam = useTeams();
  const [actionModalConfig, setActionModalConfig] = useState<{
    open: boolean;
    team?: any;
    type: 'ADD' | 'EDIT' | 'VIEW';
    title: string;
  }>({ open: false, type: 'ADD', title: '' });
  const [coniformModal, setConiformModal] = useState<any>(null);

  const handleValueChange = (value: any) => {
    hookTeam.setQueryParams((prev: any) => ({
      ...prev,
      ...value,
    }));
  };

  const handleClose = () => {
    setActionModalConfig({ open: false, title: '', type: 'ADD' });
  };

  const handleOpenConfirmModal = (t: TFunction, type: 'DELETE' | 'RECOVER', id: number) => {
    setConiformModal(
      createModalConfig(
        t,
        type,
        () => {
          hookTeam.handleDelete(id);
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
      <TeamFilter handleValueChange={handleValueChange} setActionModalConfig={setActionModalConfig} />
      <TeamList
        handleOpenConfirmModal={handleOpenConfirmModal}
        teams={hookTeam.teams?.data?.items}
        setActionModalConfig={setActionModalConfig}
      />
      <TeamAction {...hookTeam} {...actionModalConfig} handleClose={handleClose} />
      {coniformModal && <ConfirmModal {...coniformModal} />}
    </div>
  );
}
