import React, { useEffect } from 'react';
import { StyledTeamLeadersList } from './style';
import { Form } from 'antd';
import { DatePicker, Input, Select, SelectOption } from 'ui';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

interface props {
  rooms?: { id: number; name: string }[];
  teams?: { id: number; name: string }[];
  handleValueChange: (value: any) => void;
  activeTab: string;
}
export function TeamLeadersFilter({ rooms, teams, handleValueChange, activeTab }: props) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const currentYear = dayjs().year();

  useEffect(() => {
    const initialValues: any = {
      year: dayjs(`${dayjs().year()}-01-01`),
      roomId: null,
      teamId: null,
      userName: '',
    };

    form.setFieldsValue(initialValues);
  }, [form, activeTab]);

  return (
    <StyledTeamLeadersList>
      <Form form={form} layout="vertical" onValuesChange={handleValueChange}>
        <DatePicker
          className="date-picker-item"
          label={t('please_select_year')}
          picker="year"
          disabledDate={(current) => current && current.year() > currentYear}
          name="year"
        />
        <Select name="roomId" label={t('search_by_office')}>
          {rooms?.map((item, index) => (
            <SelectOption key={index} value={item.id.toString()}>
              {item.name}
            </SelectOption>
          ))}

          <SelectOption value={null}>{t('all')}</SelectOption>
        </Select>
        <Select name="teamId" label={t('search_by_team')}>
          {teams?.map((item, index) => (
            <SelectOption key={index} value={item.id.toString()}>
              {item.name}
            </SelectOption>
          ))}
          <SelectOption value={null}>{t('all')}</SelectOption>
        </Select>
        <Input name="userName" label={t('search_by_user_name')} />
      </Form>
    </StyledTeamLeadersList>
  );
}
