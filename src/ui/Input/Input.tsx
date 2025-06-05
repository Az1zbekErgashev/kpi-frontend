import React, { useEffect } from 'react';
import { Input as AntdInput } from 'antd';
import { Rule } from 'rc-field-form/lib/interface';
import { StyledFormInput } from './style';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Password } = AntdInput;

export interface InputProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  type?: string;
  size?: 'large' | 'middle' | 'small';
  value?: string;
  defaultValue?: string;
  maxLength?: number;
  allowClear?: boolean;
  label?: string;
  rules?: Rule[];
  className?: string;
  validateTrigger?: string | string[];
  noStyle?: boolean;
  initialValue?: string;
  disabled?: boolean;
  hasFeedback?: boolean;
  dependencies?: any[] | undefined;
  name?: (string | number)[] | string | number;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  variant?: 'outlined' | 'borderless' | 'filled';
  onPressEnter?: any;
  autoFocus?: any;
  modeType?: 'FILTER' | 'OTHER';
  getInitValueInParam?: boolean;
  valueType?: 'NUMBER' | 'STRING';
  autoComplete?: 'off' | 'on';
  max?: any;
  min?: any;
  addonAfter?: any;
}

export const Input = ({
  disabled = false,
  placeholder,
  name,
  required,
  prefix,
  suffix,
  type,
  onChange,
  size = 'large',
  value,
  onBlur,
  maxLength = 255,
  allowClear,
  label,
  rules = [],
  className,
  validateTrigger,
  noStyle,
  initialValue,
  hasFeedback,
  dependencies,
  onKeyDown,
  variant,
  onPressEnter,
  autoFocus,
  modeType = 'OTHER',
  getInitValueInParam,
  valueType = 'STRING',
  autoComplete,
  max,
  min,
  addonAfter,
}: InputProps) => {
  return (
    <StyledFormInput
      initialValue={initialValue}
      label={label}
      name={name}
      validateTrigger={validateTrigger}
      noStyle={noStyle}
      hasFeedback={hasFeedback}
      dependencies={dependencies}
      rules={rules}
    >
      {type === 'password' ? (
        <Password
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          prefix={prefix}
          suffix={suffix}
          type={type}
          onChange={onChange}
          size={size}
          value={value}
          onBlur={onBlur}
          maxLength={maxLength}
          allowClear={allowClear}
          className={className}
        />
      ) : (
        <AntdInput
          autoComplete={autoComplete}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          prefix={prefix}
          suffix={suffix}
          type={type}
          size={size}
          value={value}
          onBlur={onBlur}
          maxLength={maxLength}
          allowClear={allowClear}
          className={className}
          onKeyDown={onKeyDown}
          variant={variant}
          onPressEnter={onPressEnter}
          autoFocus={autoFocus}
          min={min}
          max={max}
          addonAfter={addonAfter}
        />
      )}
    </StyledFormInput>
  );
};
