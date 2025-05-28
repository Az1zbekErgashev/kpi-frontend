import { TeamAction, TeamFilter, TeamList } from 'components';
import { useTeams } from 'hooks/useTeam';
import React, { useState } from 'react';

export function Team() {
  const hookTeam = useTeams();
  const [actionModalConfig, setActionModalConfig] = useState<{
    open: boolean;
    team?: any;
    type: 'ADD' | 'EDIT' | 'VIEW';
    title: string;
  }>({ open: false, type: 'ADD', title: '' });

  const handleValueChange = (value: any) => {
    hookTeam.setQueryParams((prev: any) => ({
      ...prev,
      ...value,
    }));
  };

  const handleClose = () => {
    setActionModalConfig({ open: false, title: '', type: 'ADD' });
  };

  return (
    <div>
      <TeamFilter handleValueChange={handleValueChange} setActionModalConfig={setActionModalConfig} />
      <TeamList teams={hookTeam.teams?.data?.items} setActionModalConfig={setActionModalConfig} />
      <TeamAction {...hookTeam} {...actionModalConfig} handleClose={handleClose} />
    </div>
  );
}
