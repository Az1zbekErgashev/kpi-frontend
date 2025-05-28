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
import axios from 'axios';
import { routes } from 'config/config';

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
  const { t, i18n } = useTranslation();
  const [coniformModal, setConiformModal] = useState<any>(null);
  const [language, setLanguage] = useState(i18n.language === 'ko' ? 0 : i18n.language === 'uz' ? 2 : i18n.language === 'ru' ? 3 : 1);
  const navigate = useNavigate();

  const getLanguages = async (lang: string) => {
    try {
      const res = await axios.get(`${routes.api.baseUrl}/api/multilingualtext?language=${lang}`);
      if (res.data?.data) {
        i18n.addResourceBundle(lang, 'translation', res.data.data, true, true);
        await i18n.changeLanguage(lang);
      } else {
        console.error('Invalid translation data format:', res.data);
      }
    } catch (e) {
      console.error('Error fetching translations:', e);
    }
  };

  const logout = () => {
    Cookies.remove('jwt');
    navigate('/login');
  };

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
    const newLanguage = value === 1 ? 'en' : value === 0 ? 'ko' : value === 2 ? 'uz' : 'ru';
    setLanguage(value);
    await getLanguages(newLanguage);
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
            <Select
              value={language}
              onChange={handleLanguageChange}
              showSearch={false}
            >
              <SelectOption value={1}>
                <div className="select-item-language">
                  <SvgSelector id="english" />
                  EN
                </div>
              </SelectOption>
              <SelectOption value={0}>
                <div className="select-item-language">
                  <SvgSelector id="korea" />
                  KO
                </div>
              </SelectOption>
              <SelectOption value={2}>
                <div className="select-item-language">
                  <SvgSelector id="uzbekistan" />
                  UZ
                </div>
              </SelectOption>
              <SelectOption value={3}>
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
                <span className="userName">John Doe</span>
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