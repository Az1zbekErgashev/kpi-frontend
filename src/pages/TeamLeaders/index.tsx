import React from 'react';
import { StyledTeamLeadersPage } from './style';
import { TeamLeadersFilter, TeamLeadersList } from 'components';
import { useTeamLeaders } from 'hooks/useTeamLeaders';

export function TeamLeaders() {
  const leaderHook = useTeamLeaders();
  return (
    <StyledTeamLeadersPage>
      <TeamLeadersFilter rooms={leaderHook?.rooms?.data?.items} teams={leaderHook.teams?.data?.items} />
      <TeamLeadersList users={leaderHook.teamLeaders?.data?.items} />
    </StyledTeamLeadersPage>
  );
}
