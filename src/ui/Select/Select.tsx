import React, { useEffect } from 'react';
import { Form, Select as AntdSelect, ConfigProvider } from 'antd';
import { Rule } from 'rc-field-form/lib/interface';
import { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { StyledSelect } from './style';
import en_En from 'antd/locale/en_US';
import { useLocation, useNavigate } from 'react-router-dom';

export interface SelectProps {
  placeholder?: string;
  children?: React.ReactNode;
  defaultValue?: string | number | React.ReactText[];
  style?: React.CSSProperties;
  onChange?: any;
  size?: 'large' | 'middle' | 'small';
  mode?: 'multiple' | 'tags';
  value?: number | string | string[];
  showSearch?: boolean;
  maxTagCount?: number | 'responsive';
  allowClear?: boolean;
  loading?: boolean;
  optionLabelProp?: string;
  label?: string;
  name?: (string | number)[] | string | number;
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
  tagRender?: (props: CustomTagProps) => React.ReactElement;
  rules?: Rule[];
  initialValue?: string | string[] | number | number[];
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  noStyle?: boolean;
  disabled?: boolean;
  className?: string;
  formItemClassName?: string;
  variant?: 'outlined' | 'borderless' | 'filled';
  labelInValue?: boolean;
  filterOption?: any;
  options?: any;
  modeType?: 'FILTER' | 'SELECT';
  getInitValueInParam?: boolean;
  valueType?: 'NUMBER' | 'STRING';
}

const { Option } = AntdSelect;

export const SelectOption = Option;

export const Select = ({
  disabled,
  placeholder,
  className,
  children,
  onChange,
  defaultValue,
  style,
  size = 'large',
  value,
  mode,
  showSearch = true,
  maxTagCount,
  allowClear,
  loading,
  optionLabelProp,
  label,
  name,
  dropdownRender,
  tagRender,
  rules,
  initialValue,
  placement,
  noStyle,
  variant,
  labelInValue,
  formItemClassName,
  filterOption,
  options,
  modeType = 'SELECT',
  getInitValueInParam,
  valueType = 'STRING',
}: SelectProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (modeType === 'FILTER') {
      const params: any = new URLSearchParams(location.search);
      if (params.has(name)) {
        params.get(name);
      }
    }
  }, [location.search, name, modeType, mode]);

  const handleChange = (val: any) => {
    if (modeType === 'FILTER') {
      const params: any = new URLSearchParams(location.search);
      if (val !== undefined && val !== null && val.length !== 0) {
        const stringValue = Array.isArray(val) ? val.map((v) => String(v)).join(',') : String(val);

        params.set(name, stringValue);
      } else {
        params.delete(name);
      }
      navigate(`?${params.toString()}`, { replace: true });
    }

    if (onChange) {
      onChange(val);
    }
  };

  const handlefilterOption = (input: string, option: any) => {
    const label = option?.children;

    if (typeof label === 'string') {
      return label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }

    if (Array.isArray(label)) {
      const combinedLabel = label.join('');
      return combinedLabel.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }

    return false;
  };
  return (
    <ConfigProvider locale={en_En}>
      <Form.Item
        label={label}
        name={name}
        noStyle={noStyle}
        rules={rules}
        className={`${className} select`}
        initialValue={initialValue}
      >
        <StyledSelect
          disabled={disabled}
          placeholder={placeholder}
          getPopupContainer={(triggerNode: HTMLElement) => triggerNode}
          onChange={handleChange}
          defaultValue={defaultValue}
          style={style}
          size={size}
          value={value}
          mode={mode}
          showSearch={showSearch}
          maxTagCount={maxTagCount}
          allowClear={allowClear}
          loading={loading}
          optionLabelProp={optionLabelProp}
          dropdownRender={dropdownRender}
          tagRender={tagRender}
          placement={placement}
          variant={variant}
          labelInValue={labelInValue}
          filterOption={handlefilterOption}
          options={options}
        >
          {children}
        </StyledSelect>
      </Form.Item>
    </ConfigProvider>
  );
};
