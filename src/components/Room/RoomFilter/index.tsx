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
        <div className="select">
          <Select showSearch={false} name="IsDeleted" label={t('search_by_status')} defaultValue={0} initialValue={0}>
            <SelectOption value={0}>{t('active')}</SelectOption>
            <SelectOption value={1}>{t('inactive')}</SelectOption>
          </Select>
        </div>
      </Form>

      <Button
        label={t('create_room')}
        type="primary"
        onClick={() => setActionModalConfig({ open: true, title: 'create_room', type: 'ADD' })}
      />
    </StyledRoomFilter>
  );
}
