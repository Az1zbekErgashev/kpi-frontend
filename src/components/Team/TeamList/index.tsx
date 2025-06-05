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
      render: (createdAt, _) => dayjs(createdAt).format('YYYY.MM.DD'),
    },
    {
      title: t('employees_count'),
      dataIndex: 'emplyeesCount',
      key: 'emplyeesCount',
    },
    {
      title: t('status'),
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (isDeleted, _) => (
        <div className="status">
          {isDeleted == 1 ? (
            <div className="inactive_status">
              <div className="span"></div>
              {t('inactive')}
            </div>
          ) : (
            <div className="active_status">
              <div className="span"></div>
              {t('active')}
            </div>
          )}
        </div>
      ),
    },
    {
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      render: (action, record) => (
        <div className="action-btn-wrap">
          <div className="action-btn">
            <Tooltip
              color="#151a2d"
              style={{ color: 'white' }}
              placement="bottom"
              trigger={['hover']}
              title={t('update_user_tooltip')}
            >
              <Button
                icon={<SvgSelector id="edit" />}
                onClick={() => setActionModalConfig({ open: true, title: 'edit_team', type: 'EDIT', team: record })}
              />
            </Tooltip>
            <Tooltip
              color="#151a2d"
              style={{ color: 'white' }}
              placement="bottom"
              trigger={['hover']}
              title={t('delete_team_tooltip')}
            >
              <Button danger onClick={() => handleOpenConfirmModal(t, record.id)} icon={<SvgSelector id="trash" />} />
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];

  return (
    <StyledTeamList>
      <Table rowKey="id" columns={columns} dataSource={teams || []} />
    </StyledTeamList>
  );
}
