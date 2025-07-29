import React, { useEffect, useState } from 'react';
import { StyledTeamLeadersPage } from './style';
import { MonthlyPerformanceFilter, TeamLeadersFilter, TeamLeadersList } from 'components';
import Pagination from 'ui/Pagination/Pagination';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'ui';
import { useSearchParams } from 'react-router-dom';
import useQueryApiClient from 'utils/useQueryApiClient';
import { smoothScroll } from 'utils/globalFunctions';

interface initialQuery {
  name?: string;
  IsDeleted?: string | number;
  pageIndex: number;
  pageSize: number;
  userName?: string;
  teamId?: string;
  roomId?: string;
  year?: string;
}

interface initialQueryForPerformance {
  pageIndex: number;
  pageSize: number;
  year?: number;
  month?: number;
  userId?: number;
}

export function TeamLeaders() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<initialQuery | null>({
    pageIndex: 1,
    pageSize: 10,
    year: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
  });
  const [queryParamsForPerformance, setQueryParamsForPerformance] = useState<initialQueryForPerformance | null>({
    pageIndex: 1,
    pageSize: 10,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const { data: teamLeaders, refetch: refetchUsers } = useQueryApiClient({
    request: {
      url: `/api/user/filter-ceo`,
      method: 'GET',
      data: queryParams,
      disableOnMount: true,
    },
  });
  const { data: rooms } = useQueryApiClient({
    request: {
      url: `/api/room/filter`,
      method: 'GET',
      data: { IsDeleted: 0, PageIndex: 1, PageSize: 100 },
    },
  });
  const { data: teams } = useQueryApiClient({
    request: {
      url: `/api/team/filter`,
      method: 'GET',
      data: { IsDeleted: 0, PageIndex: 1, PageSize: 100 },
    },
  });

  const { data: monthlyData, refetch: getMonthly } = useQueryApiClient({
    request: {
      url: '/api/monthlytarget/list-ceo',
      method: 'GET',
      data: queryParamsForPerformance,
      disableOnMount: true,
    },
  });

  useEffect(() => {
    if (activeTab == '2') {
      getMonthly();
    }
  }, [queryParamsForPerformance, activeTab]);

  const handlePaginationChange = (page: number, pageSize: number) => {
    smoothScroll('top', 0);
    setQueryParams((res: any) => ({ ...res, pageIndex: page, pageSize: pageSize }));
  };
  const handleValueChange = (value: any) => {
    setQueryParams((prev: any) => ({
      ...prev,
      ...value,
    }));
  };

  const handleValueChangePerformance = (value: any) => {
    setQueryParamsForPerformance((prev: any) => ({
      ...prev,
      ...value,
      year: dayjs(value.year).format('YYYY'),
    }));
  };

  const tabItems = [
    {
      key: '1',
      label: t('kpi_establishment'),
      children: (
        <>
          <TeamLeadersFilter
            handleValueChange={handleValueChange}
            rooms={rooms?.data?.items}
            teams={teams?.data?.items}
            activeTab={activeTab}
          />
          <TeamLeadersList users={teamLeaders?.data?.items} isMonthly={false} />
          <Pagination
            total={teamLeaders?.data?.totalItems}
            pageSize={teamLeaders?.data?.itemsPerPage}
            onChange={handlePaginationChange}
            hideOnSinglePage={true}
            current={teamLeaders?.data?.PageIndex}
          />
        </>
      ),
    },
    {
      key: '2',
      label: t('kpi_performance'),
      children: (
        <>
          <MonthlyPerformanceFilter activeTab={activeTab} handleValueChange={handleValueChangePerformance} />
          <TeamLeadersList users={monthlyData?.data?.items} isMonthly={true} />
          <Pagination
            total={monthlyData?.data?.totalItems}
            pageSize={monthlyData?.data?.itemsPerPage}
            onChange={handlePaginationChange}
            hideOnSinglePage={true}
            current={monthlyData?.data?.PageIndex}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    if (queryParams && activeTab == '1') {
      refetchUsers();
    }
  }, [queryParams, activeTab]);

  const handleTabChange = (key: string) => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('tab', key);
    setSearchParams(newSearchParams);
    setActiveTab(key);
    setQueryParams({ pageIndex: 1, pageSize: 10, year: dayjs().format('YYYY-MM-DDTHH:mm:ss') });
    setQueryParamsForPerformance({
      pageIndex: 1,
      pageSize: 10,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    });
  };

  return (
    <StyledTeamLeadersPage>
      <Tabs animated={true} type="line" activeKey={activeTab} onChange={handleTabChange} items={tabItems} />
    </StyledTeamLeadersPage>
  );
}
