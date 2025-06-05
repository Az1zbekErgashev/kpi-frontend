import React from 'react';
import { StyledHomeFilter } from './style';
import { Form } from 'antd';
import { Button, Input, Select, SelectOption } from 'ui';
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

export function HomeFilter({ handleValueChange, setActionModalConfig }: props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  return (
    <StyledHomeFilter>
      <Form form={form} layout="vertical" onValuesChange={handleValueChange}>
        <Input allowClear placeholder={t('search....')} name="text" label={t('search_by_username_fullname_team')} />
        <div className="select">
          <Select showSearch={false} name="IsDeleted" label={t('search_by_status')} defaultValue={0} initialValue={0}>
            <SelectOption value={0}>{t('active')}</SelectOption>
            <SelectOption value={1}>{t('inactive')}</SelectOption>
          </Select>
        </div>
      </Form>

      <Button
        label={t('create_user')}
        type="primary"
        onClick={() => setActionModalConfig({ open: true, title: 'add_user', type: 'ADD' })}
      />
    </StyledHomeFilter>
  );
}
