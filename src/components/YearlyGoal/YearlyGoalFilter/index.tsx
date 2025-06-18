import React, { useEffect } from 'react';
import { StyledYearlyGoalFilter } from './style';
import { Form } from 'antd';
import dayjs from 'dayjs';
import { DatePicker } from 'ui';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

interface props {
  handleValueChange: any;
}
export function YearlyGoalFilter({ handleValueChange }: props) {
  const { t } = useTranslation();
  const currentYear = dayjs().year();
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  const getValidYear = (year: string | null): dayjs.Dayjs => {
    const parsed = parseInt(year || '', 10);
    if (!isNaN(parsed) && parsed >= 1000 && parsed <= currentYear) {
      return dayjs(`${parsed}-01-01`);
    }
    return dayjs(`${currentYear}-01-01`);
  };

  useEffect(() => {
    const yearParam = searchParams.get('year');
    const validYear = getValidYear(yearParam);
    setSearchParams({ year: validYear.year().toString() });
    form.setFieldsValue({ year: validYear });
    handleValueChange({ year: validYear });
  }, []);

  const onValuesChange = (_: any, allValues: any) => {
    let selectedYear = allValues.year;

    if (!selectedYear || !selectedYear.isValid() || selectedYear.year() < 1000 || selectedYear.year() > currentYear) {
      const correctedYear = dayjs(`${currentYear}-01-01`);
      form.setFieldsValue({ year: correctedYear });
      setSearchParams({ year: `${currentYear}` });
      handleValueChange({ year: correctedYear });
    } else {
      setSearchParams({ year: `${selectedYear.year()}` });
      handleValueChange(allValues);
    }
  };

  return (
    <StyledYearlyGoalFilter>
      <Form layout="vertical" form={form} onValuesChange={onValuesChange}>
        <DatePicker
          className="date-picker-item"
          defaultValue={dayjs(`${currentYear}-01-01`)}
          label={t('please_select_year')}
          picker="year"
          disabledDate={(current) => current && current.year() > currentYear}
          name="year"
          allowClear={false}
        />
      </Form>
    </StyledYearlyGoalFilter>
  );
}
