// LoginForm/style.ts

import styled from 'styled-components';

export const StyledLoginForm = styled.div`
  width: 100%;

  .form-group {
    margin-bottom: 24px;
    animation: fadeInUp 0.6s ease-out both;
  }

  .form-group:nth-child(1) {
    animation-delay: 0.5s;
  }

  .form-group:nth-child(2) {
    animation-delay: 0.6s;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Input Icon Styling */
  .input-icon {
    color: #9ca3af;
    display: flex;
    align-items: center;
    transition: color 0.3s ease;
  }

  /* Override Ant Design Form Item styles */
  .ant-form-item {
    margin-bottom: 0;
  }

  .ant-form-item-label {
    padding-bottom: 8px;
  }

  .ant-form-item-label > label {
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    height: auto;
  }

  /* Input Field Styling */
  .ant-input,
  .ant-input-password {
    padding: 12px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: 15px;
    transition: all 0.3s ease;
    background: #f9fafb;
  }

  .ant-input:hover,
  .ant-input-password:hover {
    border-color: #d1d5db;
  }

  .ant-input:focus,
  .ant-input-password:focus,
  .ant-input-focused,
  .ant-input-password .ant-input:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  }

  .ant-input-affix-wrapper:focus,
  .ant-input-affix-wrapper-focused {
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  }

  .ant-input-affix-wrapper:hover {
    border-color: #d1d5db;
  }

  .ant-input-affix-wrapper {
    padding: 12px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    background: #f9fafb;
    transition: all 0.3s ease;
  }

  .ant-input-affix-wrapper .ant-input {
    padding: 0;
    border: none;
    background: transparent;
  }

  .ant-input-affix-wrapper .ant-input:focus {
    box-shadow: none;
  }

  /* Password Input Eye Icon */
  .ant-input-password-icon {
    color: #9ca3af;
    transition: color 0.3s ease;
  }

  .ant-input-password-icon:hover {
    color: #667eea;
  }

  /* Suffix Icon Styling */
  .ant-input-suffix {
    color: #9ca3af;
  }

  .ant-input-affix-wrapper:focus-within .ant-input-suffix {
    color: #667eea;
  }

  .ant-input-affix-wrapper:focus-within .input-icon {
    color: #667eea;
  }

  /* Error State */
  .ant-form-item-has-error .ant-input,
  .ant-form-item-has-error .ant-input-affix-wrapper,
  .ant-form-item-has-error .ant-input:hover,
  .ant-form-item-has-error .ant-input-affix-wrapper:hover {
    background: #fef2f2;
    border-color: #ef4444;
  }

  .ant-form-item-has-error .ant-input:focus,
  .ant-form-item-has-error .ant-input-affix-wrapper:focus,
  .ant-form-item-has-error .ant-input-affix-wrapper-focused {
    border-color: #ef4444;
    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
  }

  .ant-form-item-explain-error {
    font-size: 13px;
    color: #ef4444;
    margin-top: 6px;
  }

  /* Form Actions */
  .form-actions {
    margin-top: 32px;
    animation: fadeInUp 0.6s ease-out 0.7s both;
  }

  /* Login Button */
  .login-button {
    width: 100%;
    padding: 14px 24px;
    background: linear-gradient(135deg, #764ba2 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    position: relative;
    overflow: hidden;
  }

  .login-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }

  .login-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }

  .login-button:hover::before {
    left: 100%;
  }

  .login-button:active {
    transform: translateY(0);
  }

  .login-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .login-button:disabled:hover {
    transform: none;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  /* Loading State */
  .login-button.loading {
    opacity: 0.8;
    cursor: wait;
  }

  /* Placeholder Styling */
  .ant-input::placeholder,
  .ant-input-password input::placeholder {
    color: #9ca3af;
    font-size: 14px;
  }

  /* Remove Ant Design default shadows */
  .ant-input,
  .ant-input-password,
  .ant-input-affix-wrapper {
    box-shadow: none !important;
  }

  .ant-input:focus,
  .ant-input-password:focus {
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1) !important;
  }

  .ant-input-affix-wrapper:focus,
  .ant-input-affix-wrapper-focused {
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1) !important;
  }
`;