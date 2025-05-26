import React, { useState } from 'react';
import { StyledDefaultLayout } from './style';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Navbar, Sitebar } from 'components';

const { Content } = Layout;

const DefaultLayout = () => {
  return (
    <StyledDefaultLayout>
      <Sitebar />
      <Navbar />
      <Layout className="layout">
        <Content className={`content container`}>
          <>
            <Outlet />
          </>
        </Content>
      </Layout>
    </StyledDefaultLayout>
  );
};

export default DefaultLayout;
