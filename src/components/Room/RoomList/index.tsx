import React from 'react';
import { StyledRoomList } from './style';
import Tooltip from 'antd/lib/tooltip';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { ColumnsType } from 'antd/es/table';
import SvgSelector from 'assets/icons/SvgSelector';
import { Button, Table } from 'ui';
import { TFunction } from 'i18next';

interface props {
  rooms: {
    id: number;
    createdAt: string;
    name: string;
    teamsCount: number;
    isDeleted: number;
  }[];
  setActionModalConfig: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      type: 'ADD' | 'EDIT' | 'VIEW';
      room?: any;
      title: string;
    }>
  >;
  handleOpenConfirmModal: (t: TFunction, id: number) => void;
}

export function RoomList({ rooms, setActionModalConfig, handleOpenConfirmModal }: props) {
  const { t } = useTranslation();

  const hasActiveRooms = rooms?.some((room) => room.isDeleted !== 1);

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
  ];

  if (hasActiveRooms) {
    columns.push({
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
              title={t('update_room_tooltip')}
            >
              <Button
                icon={<SvgSelector id="edit" />}
                onClick={() => setActionModalConfig({ open: true, title: 'edit_room', type: 'EDIT', room: record })}
              />
            </Tooltip>
            <Tooltip
              color="#151a2d"
              style={{ color: 'white' }}
              placement="bottom"
              trigger={['hover']}
              title={t('delete_room_tooltip')}
            >
              <Button onClick={() => handleOpenConfirmModal(t, record.id)} danger icon={<SvgSelector id="trash" />} />
            </Tooltip>
          </div>
        </div>
      ),
    });
  }
  return (
    <StyledRoomList>
      <Table columns={columns} dataSource={rooms || []} />
    </StyledRoomList>
  );
}
