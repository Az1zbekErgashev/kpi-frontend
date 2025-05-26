import { ChevronDown, UserCircle } from 'lucide-react';
import { StyledNavbar } from './style';
import React from 'react';
import { Dropdown, MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Navbar() {
  const { t } = useTranslation();
  const items: MenuProps['items'] = [
    {
      label: <Link to="/profile">{t('profile')}</Link>,
      key: '0',
    },
    {
      label: <div>{t('logout')}</div>,
      key: '1',
      danger: true,
    },
  ];

  return (
    <StyledNavbar>
      <div className={`navbar `}>
        <div className="searchContainer"></div>

        <div className="navActions">
          <div className="dropdown"></div>
          <Dropdown menu={{ items }} trigger={['click']}>
            <div className="dropdown">
              <button className="dropdownToggle">
                <div className="userAvatar">
                  <UserCircle size={24} />
                </div>
                <span className="userName">John Doe</span>
                <ChevronDown size={14} />
              </button>
            </div>
          </Dropdown>
        </div>
      </div>
    </StyledNavbar>
  );
}
