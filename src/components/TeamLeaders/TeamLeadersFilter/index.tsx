import React from 'react';
import { StyledTeamLeadersList } from './style';
import { Form } from 'antd';
import { DatePicker, Input, Select, SelectOption } from 'ui';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

interface props {
  rooms?: { id: number; name: string }[];
  teams?: { id: number; name: string }[];
}
export function TeamLeadersFilter({ rooms, teams }: props) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const currentYear = dayjs().year();
  return (
    <StyledTeamLeadersList>
      <Form form={form} layout="vertical">
        <DatePicker
          defaultValue={dayjs(`${currentYear}-01-01`)}
          label={t('please_select_year')}
          picker="year"
          disabledDate={(current) => current && current.year() > currentYear}
        />
        <Select label={t('search_by_room')}>
          {rooms?.map((item, index) => (
            <SelectOption key={index} value={item.id.toString()}>
              {item.name}
            </SelectOption>
          ))}

          <SelectOption value={null}>{t('all')}</SelectOption>
        </Select>
        <Select label={t('search_by_team')}>
          {teams?.map((item, index) => (
            <SelectOption key={index} value={item.id.toString()}>
              {item.name}
            </SelectOption>
          ))}
          <SelectOption value={null}>{t('all')}</SelectOption>
        </Select>
        <Input label={t('search_by_user_name')} />
      </Form>
    </StyledTeamLeadersList>
  );
}
