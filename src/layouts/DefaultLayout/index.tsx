import React, { ReactNode, useState } from 'react';
import { StyledDefaultLayout } from './style';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Navbar, Sitebar } from 'components';

const { Content } = Layout;

interface DefaultLayoutProps {
  title: string;
  children: ReactNode;
}

const DefaultLayout = ({ title, children }: DefaultLayoutProps) => {
  console.log(title);
  return (
    <StyledDefaultLayout>
      <Sitebar />
      <Navbar title={title} />
      <Layout className="layout">
        <Content className="content container">{children}</Content>
      </Layout>
    </StyledDefaultLayout>
  );
};

export default DefaultLayout;
