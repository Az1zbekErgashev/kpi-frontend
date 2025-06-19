import React from 'react';
import { StyledRoomFilter } from './style';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import { Button, Input, Select, SelectOption } from 'ui';

interface props {
  handleValueChange: any;
  setActionModalConfig: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      type: 'ADD' | 'EDIT' | 'VIEW';
      room?: any;
      title: string;
    }>
  >;
}

export function RoomFilter({ handleValueChange, setActionModalConfig }: props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  return (
    <StyledRoomFilter>
      <Form form={form} layout="vertical" onValuesChange={handleValueChange}>
        <Input allowClear placeholder={t('search....')} name="name" label={t('search_by_name')} />
      </Form>

      <Button
        label={t('create_room')}
        type="primary"
        onClick={() => setActionModalConfig({ open: true, title: 'create_room', type: 'ADD' })}
      />
    </StyledRoomFilter>
  );
}
