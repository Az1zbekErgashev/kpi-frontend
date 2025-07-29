import React, { useEffect } from 'react';
import { StyledTeamLeadersList } from '../TeamLeadersFilter/style';
import { Form } from 'antd';
import { DatePicker, Select, SelectOption } from 'ui';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

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

interface props {
  handleValueChange: (value: any) => void;
  activeTab: string;
}

export function MonthlyPerformanceFilter({ handleValueChange, activeTab }: props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const currentYear = dayjs().year();

  useEffect(() => {
    const initialValues: any = {
      year: dayjs(`${dayjs().year()}-01-01`),
    };
    initialValues.month = dayjs().month() + 1;

    form.setFieldsValue(initialValues);
  }, [form, activeTab]);

  return (
    <StyledTeamLeadersList>
      <Form form={form} layout="vertical" onValuesChange={handleValueChange}>
        <DatePicker
          label={t('select_year')}
          picker="year"
          name="year"
          allowClear={false}
          disabledDate={(current) => current && current.year() > currentYear}
        />
        <Select
          style={{ width: '150px' }}
          defaultValue={(dayjs().month() + 1).toString()}
          placeholder={t('please_select_month')}
          label={t('month')}
          name="month"
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
