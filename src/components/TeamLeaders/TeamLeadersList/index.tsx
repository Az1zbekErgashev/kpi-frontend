import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Table } from 'ui';

interface props {
  users: any;
}

type Status = 'NoWritte' | 'PendingReview' | 'Returned' | 'Approved';

const statusColors: Record<Status, { background: string; color: string }> = {
  NoWritte: {
    background: '#e0e0e0',
    color: '#4a4a4a',
  },
  PendingReview: {
    background: '#fff0b3',
    color: '#b38600',
  },
  Returned: {
    background: '#ffcccc',
    color: '#cc0000',
  },
  Approved: {
    background: '#c6f6d5',
    color: '#006644',
  },
};
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
      render: (record, _) => (
        <div className="status-wrapp">
          <div style={{ backgroundColor: getColors(record).background, color: getColors(record).color }}>
            {t(record)}
          </div>
        </div>
      ),
    },
  ];

  const getColors = (status: Status) => {
    return statusColors[status];
  };

  return (
    <div>
      <Table
        onRow={(record: any) => ({
          onClick: () => navigate(`/goal/user-id/${record.teamId}/${record.year}`),
        })}
        columns={columns}
        dataSource={users ?? []}
      />
    </div>
  );
}
