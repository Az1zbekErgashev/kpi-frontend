import React, { useEffect } from 'react';
import { Pagination as AntdPagination, Select } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import type { PaginationProps } from 'antd';
import { StyledPagination } from './style';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import ShowInPage from './ShowInPage';

interface IPaginationProps extends PaginationProps {}
const Pagination = ({ current, pageSize, onChange, total }: IPaginationProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryParams = new URLSearchParams(location.search);
  const queryPageIndex = queryParams.get('pageIndex');
  const queryPageSize = queryParams.get('pageSize');

  useEffect(() => {
    if (!queryPageIndex || !queryPageSize) {
      queryParams.set('pageIndex', '1');
      queryParams.set('pageSize', '10');
      navigate({
        pathname: location.pathname,
        search: queryParams.toString(),
      }
    );
    }
  }, [location.pathname, navigate, queryParams, queryPageIndex, queryPageSize]);

  const handlePageChange = (page: number, pageSize: number) => {
    if (queryPageIndex !== page.toString() || queryPageSize !== pageSize.toString()) {
      queryParams.set('pageIndex', page.toString());
      queryParams.set('pageSize', pageSize.toString());
      navigate({
        pathname: location.pathname,
        search: queryParams.toString(),
      },
    );
    }
    onChange && onChange(page, pageSize);
  };

  return (
    <StyledPagination>
      <div className="custom-pagination">
        <AntdPagination
          current={parseInt(queryPageIndex || current?.toString() || '1', 10)}
          pageSize={parseInt(queryPageSize || pageSize?.toString() || '10', 10)}
          onChange={handlePageChange}
          total={total}
          showSizeChanger={false}
          prevIcon={
            <div className="pagination-btn">
              <LeftOutlined />
              &nbsp;
              {t('previous')}
            </div>
          }
          nextIcon={
            <div className="pagination-btn">
              {t('next')}&nbsp;
              <RightOutlined />
            </div>
          }
        />
      </div>
    </StyledPagination>
  );
};

export default Pagination;
