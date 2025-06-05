import { TeamAction, TeamFilter, TeamList } from 'components';
import { useTeams } from 'hooks/useTeam';
import { TFunction } from 'i18next';
import React, { useState } from 'react';
import { ConfirmModal } from 'ui';

const createModalConfig = (t: TFunction, onConfirm: () => void, onCancel: () => void) => ({
  cancelText: t('cancel'),
  confirmText: t('delete'),
  title: t('delete_team_title'),
  content: t('delete_team_description'),
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

  const handleOpenConfirmModal = (t: TFunction, id: number) => {
    setConiformModal(
      createModalConfig(
        t,
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
