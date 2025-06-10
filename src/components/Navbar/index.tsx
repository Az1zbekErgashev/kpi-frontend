import React, { useState } from 'react';
import { ChevronDown, UserCircle } from 'lucide-react';
import { StyledNavbar } from './style';
import { Dropdown, MenuProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Select, SelectOption, ConfirmModal } from 'ui';
import SvgSelector from 'assets/icons/SvgSelector';
import { TFunction } from 'i18next';
import Cookies from 'js-cookie';
import { useLanguage } from 'contexts/LanguageContext';
import axios from 'axios';
import { routes } from 'config/config';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useUser } from 'hooks/useUserState';

const createModalConfig = (t: TFunction, onConfirm: () => void, onCancel: () => void) => ({
  cancelText: t('cancel'),
  confirmText: t('logout'),
  title: t('logout_title'),
  content: t('logout_description'),
  open: true,
  onConfirm,
  onCancel,
});

interface props {
  title: string;
}

export function Navbar({ title }: props) {
  const { t } = useTranslation();
  const [coniformModal, setConiformModal] = useState<any>(null);
  const { changeLanguage, language } = useLanguage();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const logout = () => {
    Cookies.remove('jwt');
    navigate('/login');
  };

  const { data: userProfile } = useQueryApiClient({
    request: {
      url: '/api/user/profile',
      method: 'GET',
    },
    onSuccess(response) {
      setUser(response?.data);
    },
  });

  const handleLogout = () => {
    setConiformModal(
      createModalConfig(
        t,
        () => {
          logout();
        },
        () => {
          setConiformModal(null);
        }
      )
    );
  };

  const handleLanguageChange = async (value: number) => {
    localStorage.setItem('language', value.toString());
    changeLanguage(value.toString());
  };

  const items: MenuProps['items'] = [
    {
      label: <Link to="/profile">{t('profile')}</Link>,
      key: '0',
    },
    {
      label: <div onClick={handleLogout}>{t('logout')}</div>,
      key: '1',
      danger: true,
    },
  ];

  return (
    <StyledNavbar>
      <div className={`navbar `}>
        <div className="searchContainer">{t(title)}</div>

        <div className="navActions">
          <div className="dropdown">
            <Select value={language} onChange={handleLanguageChange} showSearch={false}>
              <SelectOption value={'1'}>
                <div className="select-item-language">
                  <SvgSelector id="english" />
                  EN
                </div>
              </SelectOption>
              <SelectOption value={'0'}>
                <div className="select-item-language">
                  <SvgSelector id="korea" />
                  KO
                </div>
              </SelectOption>
              <SelectOption value={'2'}>
                <div className="select-item-language">
                  <SvgSelector id="uzbekistan" />
                  UZ
                </div>
              </SelectOption>
              <SelectOption value={'3'}>
                <div className="select-item-language">
                  <SvgSelector id="russia" />
                  RU
                </div>
              </SelectOption>
            </Select>
          </div>
          <Dropdown menu={{ items }} trigger={['click']}>
            <div className="dropdown">
              <button className="dropdownToggle">
                <div className="userAvatar">
                  <UserCircle size={24} />
                </div>
                <span className="userName">{userProfile?.data?.userName}</span>
                <ChevronDown size={14} />
              </button>
            </div>
          </Dropdown>
        </div>
      </div>

      {coniformModal && <ConfirmModal {...coniformModal} />}
    </StyledNavbar>
  );
}
