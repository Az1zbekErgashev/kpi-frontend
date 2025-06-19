import React from 'react';
import { StyledUsersFilter } from './style';
import { Form } from 'antd';
import { Button, Input } from 'ui';
import { useTranslation } from 'react-i18next';

interface props {
  handleValueChange: any;
  setActionModalConfig: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      type: 'ADD' | 'EDIT' | 'VIEW';
      user?: any;
      title: string;
    }>
  >;
}

export function UsersFilter({ handleValueChange, setActionModalConfig }: props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  return (
    <StyledUsersFilter>
      <Form form={form} layout="vertical" onValuesChange={handleValueChange}>
        <Input allowClear placeholder={t('search....')} name="text" label={t('search_by_username_fullname_team')} />
      </Form>

      <Button
        label={t('create_user')}
        type="primary"
        onClick={() => setActionModalConfig({ open: true, title: 'add_user', type: 'ADD' })}
      />
    </StyledUsersFilter>
  );
}
