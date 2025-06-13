import React from 'react';
import { StyledTeamLeadersPage } from './style';
import { TeamLeadersFilter, TeamLeadersList } from 'components';
import { useTeamLeaders } from 'hooks/useTeamLeaders';
import Pagination from 'ui/Pagination/Pagination';
import dayjs from 'dayjs';

export function TeamLeaders() {
  const leaderHook = useTeamLeaders();

  const handleValueChange = (value: any) => {
    leaderHook.setQueryParams((prev: any) => ({
      ...prev,
      ...value,
      year: dayjs(value.year).format('YYYY-MM-DDTHH:mm:ss'),
    }));
  };
  return (
    <StyledTeamLeadersPage>
      <TeamLeadersFilter
        handleValueChange={handleValueChange}
        rooms={leaderHook?.rooms?.data?.items}
        teams={leaderHook.teams?.data?.items}
      />
      <TeamLeadersList users={leaderHook.teamLeaders?.data?.items} />
      <Pagination
        total={leaderHook.teamLeaders?.data?.totalItems}
        pageSize={leaderHook.teamLeaders?.data?.itemsPerPage}
        onChange={leaderHook.handlePaginationChange}
        hideOnSinglePage={true}
        current={leaderHook.teamLeaders?.data?.PageIndex}
      />
    </StyledTeamLeadersPage>
  );
}
