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
  const columns: ColumnsType = [
    {
      title: t('user_name'),
      dataIndex: 'userName',
      key: 'userName',
      width: 150,
    },
    {
      title: t('full_name'),
      dataIndex: 'fullName',
      key: 'fullName',
      width: 150,
    },
    {
      title: t('registration_date'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (date, _) => dayjs(date).format('YYYY.MM.DD'),
    },
    {
      title: t('role'),
      dataIndex: 'role',
      key: 'role',
      width: 150,
    },
    {
      title: t('rank'),
      dataIndex: 'rank',
      key: 'rank',
      width: 150,
      render: (rank, _) => rank || t('-'),
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
      title: t('status'),
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      width: 150,
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
      width: 150,
      render: (action, record) => (
        <div className="action-btn-wrap">
          <div className="action-btn">
            {user?.Id != record.id && (
              <Tooltip
                color="#151a2d"
                style={{ color: 'white' }}
                placement="bottom"
                trigger={['hover']}
                title={t('update_user')}
              >
                <Button
                  icon={<SvgSelector id="edit" />}
                  onClick={() => setActionModalConfig({ open: true, title: 'edit_user', type: 'EDIT', user: record })}
                />
              </Tooltip>
            )}
            <Tooltip
              color="#151a2d"
              style={{ color: 'white' }}
              placement="bottom"
              trigger={['hover']}
              title={t('delete_user')}
            >
              <Button onClick={() => handleOpenConfirmModal(t, record.id)} danger icon={<SvgSelector id="trash" />} />
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];

  return (
    <StyledUsersList>
      <Table columns={columns} dataSource={users || []} scroll={{ x: 'max-content' }} />
    </StyledUsersList>
  );
}
