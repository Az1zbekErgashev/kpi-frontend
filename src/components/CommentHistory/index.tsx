import React from 'react';
import { StyledCommentHistory } from './style';
import { useTranslation } from 'react-i18next';
import { ColumnsType } from 'antd/lib/table';
import { Table } from 'ui';
import dayjs from 'dayjs';

interface props {
  comment: { status: string; content: string; createdAt: string }[];
}
export function CommentHistory({ comment }: props) {
  const { t } = useTranslation();

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PendingReview':
        return {
          background: '#FFF8E1',
          color: '#FFB300', // amber text (Material amber 600)
        };
      case 'Returned':
        return {
          background: '#FDECEA', // soft red background
          color: '#E53935', // bright red text (Material red 600)
        };
      case 'Approved':
        return {
          background: '#E8F5E9', // soft green background
          color: '#43A047', // green text (Material green 600)
        };
      default:
        return {
          background: '#E3F2FD', // soft blue
          color: '#1976D2', // blue text
        };
    }
  };

  const columns: ColumnsType = [
    { dataIndex: 'no', key: 'no', title: t('no'), render: (type, record, index) => index + 1 },
    { dataIndex: 'content', key: 'content', title: t('comment') },
    {
      dataIndex: 'status',
      key: 'status',
      title: t('status'),
      render: (status, _) => (
        <div className="status-wrapp">
          <div
            className="status"
            style={{ background: getStatusText(status).background, color: getStatusText(status).color }}
          >
            {t(status)}
          </div>
        </div>
      ),
    },
    {
      dataIndex: 'createdAt',
      key: 'createdAt',
      title: t('createdAt'),
      render: (createdAt, _) => dayjs(createdAt).format('YYYY.MM.DD HH:MM'),
    },
  ];

  console.log(comment);

  return (
    <StyledCommentHistory>
      <div className="styled_header">
        <h1 className="title">2025년 WSU컵 KPI 수집 진행현황</h1>
      </div>
      <Table columns={columns} dataSource={comment ?? []} />
    </StyledCommentHistory>
  );
}
