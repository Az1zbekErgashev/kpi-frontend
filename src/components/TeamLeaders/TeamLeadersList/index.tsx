import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Table } from 'ui';

interface props {
  users: any;
}
export function TeamLeadersList({ users }: props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const columns: ColumnsType = [
    {
      title: t('room'),
      dataIndex: 'room',
      key: 'room',
    },
    {
      title: t('team'),
      dataIndex: 'team',
      key: 'team',
    },
    {
      title: t('full_name'),
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: t('user_name'),
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
    },
  ];
  return (
    <div>
      <Table
        onRow={(record: any) => ({
          onClick: () => navigate(`/goal/user-id/${record.id}/${record.year}`),
        })}
        columns={columns}
        dataSource={users ?? []}
      />
    </div>
  );
}
