import React, { useState } from 'react';
import { StyledTeamLeadersPage } from './style';
import { MonthlyPerformanceFilter, TeamLeadersFilter, TeamLeadersList } from 'components';
import { useTeamLeaders } from 'hooks/useTeamLeaders';
import Pagination from 'ui/Pagination/Pagination';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';

export function TeamLeaders() {
  const leaderHook = useTeamLeaders();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('1');
  const handleValueChange = (value: any) => {
    leaderHook.setQueryParams((prev: any) => ({
      ...prev,
      ...value,
      year: dayjs(value.year).format('YYYY-MM-DDTHH:mm:ss'),
    }));
  };

  const { data: monthlyData } = useQueryApiClient({
    request: {
      url: '/api/monthlytarget/list-ceo',
      method: 'GET',
    },
  });

  const tabItems = [
    {
      key: '1',
      label: t('kpi_establishment'),
      children: (
        <>
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
        </>
      ),
    },
    {
      key: '2',
      label: t('kpi_performance'),
      children: (
        <>
          <MonthlyPerformanceFilter />
          <TeamLeadersList users={monthlyData?.data?.items} />
          <Pagination
            total={monthlyData?.data?.totalItems}
            pageSize={monthlyData?.data?.itemsPerPage}
            onChange={leaderHook.handlePaginationChange}
            hideOnSinglePage={true}
            current={monthlyData?.data?.PageIndex}
          />
        </>
      ),
    },
  ];
  return (
    <StyledTeamLeadersPage>
      <Tabs animated={true} type="line" activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
    </StyledTeamLeadersPage>
  );
}
