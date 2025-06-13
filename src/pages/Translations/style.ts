import styled from 'styled-components';

export const StyledTranslation = styled.div`
  &.translation-modal,
  &.statuses {
    margin-bottom: 0px !important;
  }

  .header-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .ant-btn-primary {
      padding: 8px 24px;
      height: 40px;
      font-size: 1rem;
      font-weight: 500;
      border-radius: 6px;
      background-color: var(--primary-color, rgb(88, 153, 214));
      border: none;
      color: #fff;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      &:hover {
        background-color: var(--primary-color, rgb(88, 153, 214));
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        transform: translateY(-1px);
      }

      &:active {
        background-color: var(--primary-active-color, #096dd9);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        transform: translateY(0);
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.2);
      }
    }
  }

  .filter-items {
    margin-bottom: 30px !important;
    display: flex;
    align-items: center;
    gap: 20px;
    width: 80%;
    padding: 15px;
    box-sizing: border-box;
    padding: 0 !important;
    margin: 0 !important;

    .ant-form-item {
      width: 100%;
      min-width: 200px;
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .action-form {
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    margin-top: 20px !important;

    .inputs {
      display: flex;
      flex-direction: column;
      row-gap: 15px;
    }
  }

  .action-button {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 12px;
    margin-top: 20px !important;
  }

  .color-picker {
    input {
      height: 30px !important;
      font-size: 0.7777777rem;
      color: var(--text-color);
      font-family: var(--default-font);
      font-style: normal;
      font-weight: 500;
      line-height: 1.55556rem;
      width: 100%;

      &::-webkit-input-placeholder {
        font-family: var(--default-font);
        font-size: 0.777777rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.55556rem;
        color: #cacaca;
      }
    }
    .ant-form-item-explain-error {
      font-size: 0.8889rem;
    }

    .ant-input-affix-wrapper {
      padding: 0 10px;
      font-size: 0.777777rem;
    }

    .ant-select-selection-item {
      display: none !important;
    }

    .ant-form-item-label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
