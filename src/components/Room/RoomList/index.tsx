import React from 'react';
import { StyledRoomList } from './style';
import Tooltip from 'antd/lib/tooltip';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { ColumnsType } from 'antd/es/table';
import SvgSelector from 'assets/icons/SvgSelector';
import { Table } from 'ui';

interface props {
  rooms: {
    id: number;
    createdAt: string;
    name: string;
    teamsCount: number;
  }[];
  setActionModalConfig: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      type: 'ADD' | 'EDIT' | 'VIEW';
      room?: any;
      title: string;
    }>
  >;
}

export function RoomList({ rooms, setActionModalConfig }: props) {
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
      title: t('teams_count'),
      dataIndex: 'teamsCount',
      key: 'teamsCount',
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
              title={t('update_room')}
            >
              <button
                onClick={() => setActionModalConfig({ open: true, title: 'edit_room', type: 'EDIT', room: record })}
                className="update"
              >
                <SvgSelector id="edit" />
              </button>
            </Tooltip>
            <Tooltip
              color="#151a2d"
              style={{ color: 'white' }}
              placement="bottom"
              trigger={['hover']}
              title={t('delete_room')}
            >
              <button className="delete">
                <SvgSelector id="trash" />
              </button>
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];
  return (
    <StyledRoomList>
      <Table columns={columns} dataSource={rooms || []} />
    </StyledRoomList>
  );
}
