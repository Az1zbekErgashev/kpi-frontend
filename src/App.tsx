/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import axios from 'axios';
import { ConfigProvider, theme } from 'antd';
import { ThemeProvider } from 'styled-components';
import { token } from 'config/token';
import { RouterProvider } from 'react-router-dom';
import { routes } from 'config/config';
import { router } from 'utils/routes';
import useJwt from 'utils/useJwt';
import i18n from 'utils/i18n';
import { useLanguage } from 'contexts/LanguageContext';

function App() {
  const { language } = useLanguage();

  const getLanguages = async () => {
    try {
      const res = await axios.get(`${routes.api.baseUrl}/api/multilingualtext?language=${language}`);
      if (res.data) {
        if (res?.data?.data) {
          i18n.addResourceBundle(language, 'translation', res?.data?.data, true, true);
          await i18n.changeLanguage(language);
        } else {
          console.error('Invalid translation data format:', res.data);
        }
      }
    } catch (e) {
      return;
    }
  };

  useEffect(() => {
    getLanguages();
  }, [language]);

  return (
    <ConfigProvider
      theme={{
        token: token,
        components: {
          Notification: {
            zIndexPopup: 10002,
          },
        },
        algorithm: theme.darkAlgorithm,
      }}
    >
      <ThemeProvider theme={{ antd: token }}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
