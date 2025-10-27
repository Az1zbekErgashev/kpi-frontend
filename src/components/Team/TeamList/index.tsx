import React from 'react';
import { StyledTeamList } from './style';
import { Button, Table } from 'ui';
import { useTranslation } from 'react-i18next';
import { ColumnsType } from 'antd/es/table';
import Tooltip from 'antd/lib/tooltip';
import SvgSelector from 'assets/icons/SvgSelector';
import dayjs from 'dayjs';
import { TFunction } from 'i18next';

interface props {
  setActionModalConfig: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      type: 'ADD' | 'EDIT' | 'VIEW';
      team?: any;
      title: string;
    }>
  >;
  teams: any;
  handleOpenConfirmModal: (t: TFunction, id: number) => void;
}

export function TeamList({ setActionModalConfig, teams, handleOpenConfirmModal }: props) {
  const { t } = useTranslation();

  const hasActiveTeams = teams?.some((team: any) => team.isDeleted !== 1);

  const columns: ColumnsType = [
    {
      title: t('team_name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('created_at'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt, _) => {
        const parsedDate = dayjs(createdAt, 'DD.MM.YYYY HH:mm:ss');
        return parsedDate.isValid() ? parsedDate.format('YYYY.MM.DD') : createdAt;
      },
    },
    {
      title: t('employees_count'),
      dataIndex: 'emplyeesCount',
      key: 'emplyeesCount',
    },
  ];

  if (hasActiveTeams) {
    columns.push({
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      render: (action, record) => (
        <div className="action-btn-wrap">
          <div className="action-btn">
            <Button
              icon={<SvgSelector id="edit" />}
              onClick={() => setActionModalConfig({ open: true, title: 'edit_team', type: 'EDIT', team: record })}
            />
            <Button danger onClick={() => handleOpenConfirmModal(t, record.id)} icon={<SvgSelector id="trash" />} />
          </div>
        </div>
      ),
    });
  }

  return (
    <StyledTeamList>
      <Table rowKey="id" columns={columns} dataSource={teams || []} />
    </StyledTeamList>
  );
}
