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
      render: (date, _) => dayjs(date).format('YYYY.MM.DD'),
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
    {
      title: t('room'),
      dataIndex: 'room',
      key: 'room',
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
              title={t('update_user')}
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
      <Table columns={columns} dataSource={users || []} />
    </StyledUsersList>
  );
}
