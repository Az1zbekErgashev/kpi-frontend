import React from 'react';
import { StyledUsersList } from './style';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { Table } from 'ui';

interface props {
  users: {
    id: number;
    createdAt: string;
    userName: string;
    fullName: string;
    role: string;
    teamId: number;
    team: string;
  }[];
}
export function UsersList({ users }: props) {
  const { t } = useTranslation();

  const columns: ColumnsType = [
    {
      title: t('user_name'),
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: t('full_name'),
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: t('registration_date'),
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: t('role'),
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: t('team'),
      dataIndex: 'team',
      key: 'team',
    },
  ];

  return (
    <StyledUsersList>
      <Table columns={columns} dataSource={users || []} />
    </StyledUsersList>
  );
}
