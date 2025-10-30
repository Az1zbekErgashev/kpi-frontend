import React from 'react';
import { StyledTeamFilter } from './style';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import { Button, Input } from 'ui';

interface props {
  handleValueChange: any;
  setActionModalConfig: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      type: 'ADD' | 'EDIT' | 'VIEW';
      team?: any;
      title: string;
    }>
  >;
}

export function TeamFilter({ handleValueChange, setActionModalConfig }: props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  return (
    <StyledTeamFilter>
      <Form form={form} layout="vertical" onValuesChange={handleValueChange}>
        <Input allowClear name="name" label={t('search_by_namee')} autoComplete='off' />
      </Form>

      <Button
        label={t('create_team')}
        type="primary"
        onClick={() => setActionModalConfig({ open: true, title: 'create_team', type: 'ADD' })}
      />
    </StyledTeamFilter>
  );
}
