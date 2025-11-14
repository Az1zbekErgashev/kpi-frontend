import React from 'react';
import { StyledRoomList } from './style';
import Tooltip from 'antd/lib/tooltip';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { ColumnsType } from 'antd/es/table';
import SvgSelector from 'assets/icons/SvgSelector';
import { Button, Table } from 'ui';
import { TFunction } from 'i18next';
import { dateFormatByLanguage } from 'utils/helper';

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
      title: t('room'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('created_at'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => dateFormatByLanguage(createdAt),
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
            <Button
              icon={<SvgSelector id="edit" />}
              onClick={() => setActionModalConfig({ open: true, title: 'edit_room', type: 'EDIT', room: record })}
            />
            <Button onClick={() => handleOpenConfirmModal(t, record.id)} danger icon={<SvgSelector id="trash" />} />
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
