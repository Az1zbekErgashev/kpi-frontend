import React, { useEffect } from 'react';
import { StyledTeamLeadersList } from '../TeamLeadersFilter/style';
import { Form, Button } from 'antd';
import { DatePicker, Select, SelectOption } from 'ui';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

interface props {
  handleValueChange: (value: any) => void;
  activeTab: string;
}

export function MonthlyPerformanceFilter({ handleValueChange, activeTab }: props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const currentYear = dayjs().year();

  const months = [
    { value: '1', label: t('january') },
    { value: '2', label: t('february') },
    { value: '3', label: t('march') },
    { value: '4', label: t('april') },
    { value: '5', label: t('may') },
    { value: '6', label: t('june') },
    { value: '7', label: t('july') },
    { value: '8', label: t('august') },
    { value: '9', label: t('september') },
    { value: '10', label: t('october') },
    { value: '11', label: t('november') },
    { value: '12', label: t('december') },
  ];

  const initialValues: any = {
    year: dayjs(`${dayjs().year()}-01-01`),
    month: (dayjs().month() + 1).toString(),
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, activeTab]);

  const handleReset = () => {
    form.setFieldsValue(initialValues);
    handleValueChange(initialValues);
  };

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
              {item.label}
            </SelectOption>
          ))}
        </Select>

     
          <Button onClick={handleReset}>
            {t('reset')}
          </Button>
      </Form>
    </StyledTeamLeadersList>
  );
}