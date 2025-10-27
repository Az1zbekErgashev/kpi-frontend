// LoginMain/index.tsx

import React from 'react';
import { LoginForm } from '../LoginForm';
import { LanguageSwitcher } from 'ui';
import { useLanguage } from 'contexts/LanguageContext';
import { StyledLoginMain } from './style';

export function LoginMain() {
  const { changeLanguage, language } = useLanguage();
  
  const handleLanguageChange = async (value: number) => {
    localStorage.setItem('language', value.toString());
    changeLanguage(value.toString());
  };
  
  return (
    <StyledLoginMain>
      <div className="background-effect">
        <div className="gradient-circle circle-1"></div>
        <div className="gradient-circle circle-2"></div>
        <div className="gradient-circle circle-3"></div>
      </div>

      <div className="particles">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="particle"></div>
        ))}
      </div>

      <div className="language-switcher-container">
        <LanguageSwitcher handleLanguageChange={handleLanguageChange} language={language} />
      </div>

      <div className="login-wrapper">
        <div className="image-side">
          <div className="overlay"></div>
          <div className="content-overlay">
            <div className="brand-logo">
              <span className="logo-text">KPI</span>
              <span className="logo-dot"></span>
            </div>
            <h2>Analytics Dashboard</h2>
            <p>Powerful insights for your business performance</p>
          </div>
        </div>

        <div className="login-content">
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your dashboard</p>
          </div>

          <LoginForm />
        </div>
      </div>
    </StyledLoginMain>
  );
}