import React from 'react';
import { StyledUsersList } from './style';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { Button, Table } from 'ui';
import dayjs from 'dayjs';
import SvgSelector from 'assets/icons/SvgSelector';
import Tooltip from 'antd/lib/tooltip';
import { useUser } from 'hooks/useUserState';
import { TFunction } from 'i18next';
import { parse } from 'path';
import { dateFormatByLanguage } from 'utils/helper';
interface props {
  users: {
    id: number;
    createdAt: string;
    userName: string;
    fullName: string;
    role: string;
    teamId: number;
    team: string;
    rank?: string | number;
    isDeleted: number;
  }[];
  setActionModalConfig: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      type: 'ADD' | 'EDIT' | 'VIEW';
      user?: any;
      title: string;
    }>
  >;
  handleOpenConfirmModal: (t: TFunction, id: number) => void;
}
export function UsersList({ users, setActionModalConfig, handleOpenConfirmModal }: props) {
  const { t } = useTranslation();
  const { user } = useUser();

  const hasActiveUsers = users?.some((team: any) => team.isDeleted !== 1);
  const language = localStorage.getItem('language') || 'en';
  const columns: ColumnsType = [
    {
      title: t('id'),
      dataIndex: 'userName',
      key: 'userName',
      width: 150,
    },
    {
      title: t('name'),
      dataIndex: 'fullName',
      key: 'fullName',
      width: 150,
    },
    {
      title: t('role'),
      dataIndex: 'role',
      key: 'role',
      width: 150,
    },
    {
      title: t('position'),
      dataIndex: ['position', 'name'],
      key: 'position',
      width: 150,
      render: (position) => t(position),
    },
    {
      title: t('team'),
      dataIndex: 'team',
      key: 'team',
      width: 150,
    },
    {
      title: t('room'),
      dataIndex: 'room',
      key: 'room',
      width: 150,
    },
    {
      title: t('registration_date'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
      render: (date) => dateFormatByLanguage(date),
    },
  ];

  if (hasActiveUsers) {
    columns.push({
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      width: 150,
      render: (action, record) => (
        <div className="action-btn-wrap">
          <div className="action-btn">
            {user?.Id != record.id && (
              <Button
                icon={<SvgSelector id="edit" />}
                onClick={() => setActionModalConfig({ open: true, title: 'edit_user', type: 'EDIT', user: record })}
              />
            )}
            <Button onClick={() => handleOpenConfirmModal(t, record.id)} danger icon={<SvgSelector id="trash" />} />
          </div>
        </div>
      ),
    });
  }

  return (
    <StyledUsersList>
      <Table columns={columns} dataSource={users || []} scroll={{ x: 'max-content' }} />
    </StyledUsersList>
  );
}
