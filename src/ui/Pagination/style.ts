import styled from 'styled-components';

export const StyledPagination = styled.div`
  .custom-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 24px;
    background: #ffffff;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;

    position: relative;
    height: auto;
  }

  .pagination-page-size {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .pagination-page-size span {
    font-size: 14px;
    color: #4f4f4f;
    font-weight: 500;
  }

  .ant-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ant-pagination-prev,
  .ant-pagination-next {
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid #d1d1d1;
      background: #f7f7f7;
      transition: all 0.3s;

      &:hover {
        background: #e0e0e0;
      }
    }
  }

  .ant-pagination-next {
    margin-left: 5px;
  }

  .pagination-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  .ant-pagination-item {
    margin: 0 5px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    border: 1px solid #d1d1d1;
    transition: all 0.3s;

    a {
      color: #4f4f4f;
    }

    &:hover {
      background: #e0e0e0;
    }
  }

  .ant-pagination-item-active {
    background: rgb(78, 98, 177) !important;
    border-color: rgb(78, 98, 177) !important;

    a {
      color: #ffffff !important;
    }
  }

  .ant-select-selector {
    border-radius: 8px !important;
    border: 1px solid #d1d1d1 !important;

    height: 40px !important;
    min-width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    border: 1px solid var(--gray-300) !important;
    box-shadow: none !important;
  }

  .ant-select {
    width: auto !important;
  }
`;
