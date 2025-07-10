import React from 'react';
import { StyledTeamLeadersList } from '../TeamLeadersFilter/style';
import { Form } from 'antd';
import { DatePicker, Select, SelectOption } from 'ui';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

export function MonthlyPerformanceFilter() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const currentYear = dayjs().year();

  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  return (
    <StyledTeamLeadersList>
      <Form form={form} layout="vertical">
        <DatePicker
          className="date-picker-item"
          defaultValue={dayjs(`${currentYear}-01-01`)}
          label={t('please_select_year')}
          picker="year"
          disabledDate={(current) => current && current.year() > currentYear}
          name="year"
        />
        <Select
          style={{ width: '150px' }}
          defaultValue={(dayjs().month() + 1).toString()}
          placeholder={t('please_select_month')}
          label={t('month')}
        >
          {months.map((item, index) => (
            <SelectOption key={index} value={item.value}>
              {t(item.label)}
            </SelectOption>
          ))}
        </Select>
      </Form>
    </StyledTeamLeadersList>
  );
}
