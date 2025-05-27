import React from 'react';
import { StyledUsersList } from './style';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

export function UsersList() {
  const { t } = useTranslation();
  const columns: ColumnsType = [
    {
      title: t('user_name'),
      dataIndex: 'userName',
      key: 'userName',
    },
  ];
  return <StyledUsersList>UsersList</StyledUsersList>;
}
