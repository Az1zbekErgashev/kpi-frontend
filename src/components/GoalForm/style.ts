import styled from 'styled-components';

export const StyledGoalForm = styled.div`
  .kpi-form-container {
    padding: 16px;

    @media (min-width: 768px) {
      padding: 24px;
    }
  }

  .main-card {
    margin: 0 auto;
  }

  .hidden-input {
    display: none;
  }

  .form-title {
    text-align: center;
    color: #1890ff;
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 18px;

    @media (min-width: 768px) {
      font-size: 24px;
    }
  }

  .division-card {
    margin-bottom: 16px;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .division-card:hover {
    border-color: #1890ff;
    box-shadow: 0 2px 8px rgba(24, 144, 255, 0.1);
  }

  .division-number-col {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 8px;

    @media (max-width: 575px) {
      justify-content: flex-start;
      margin-bottom: 12px;
    }
  }

  .division-number {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #1890ff;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 14px;
    flex-shrink: 0;
  }

  .form-item {
    margin-bottom: 16px;
  }

  .goals-section {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    padding: 12px;
    background: #fafafa;
    padding-bottom: 20px;
  }

  .goal-item {
    width: 100%;
    margin-bottom: 12px;
    padding: 8px;
    background: white;
    border-radius: 4px;
    border: 1px solid #e8e8e8;

    &:last-of-type {
      margin-bottom: 8px;
    }
  }

  .goal-content {
    margin-bottom: 8px;
  }

  .goal-type {
    font-size: 12px;
    display: block;
    margin: 4px 0;
  }

  .goal-target {
    font-size: 12px;
    display: block;
    margin: 4px 0;
  }

  .edit-goal-btn {
    padding: 0;
    height: auto;
    font-size: 12px;
  }

  .goal-details {
    font-size: 12px;
    margin-top: 4px;
  }

  .empty-goals {
    text-align: center;
    padding: 20px;
  }

  .add-goal-btn {
    border-color: #1890ff;
    color: #1890ff;
    margin-top: 8px;
  }

  .add-goal-btn:hover {
    border-color: #40a9ff;
    color: #40a9ff;
  }
  .action-buttons-col {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .action-buttons {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: flex-start;
    padding-top: 8px;

    @media (max-width: 575px) {
      justify-content: flex-start;
      margin-top: 12px;
    }
  }

  .add-division-btn,
  .remove-division-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .comment-card {
    margin-top: 16px;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
  }

  .submit-section{
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 12px;
  }

  .cancel-btn {
    height: 48px;
    padding: 0 32px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    background: #ffffff;
    border: 2px solid #d9d9d9;
    color: #595959;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    min-width: 120px;
  }

  .cancel-btn:hover {
    border-color: #40a9ff;
    color: #1890ff;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .cancel-btn:active {
    transform: translateY(0);
  }

  .cancel-btn:focus {
    outline: none;
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  .submit-btn {
    height: 48px !important;
    padding: 0 32px !important;
    font-size: 16px !important;
    font-weight: 600 !important;
    border-radius: 8px !important;
    background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%) !important;
    border: none !important;
    color: #ffffff !important;
    cursor: pointer !important;
    transition: all 0.2s ease-in-out !important;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3) !important;
    min-width: 200px !important;
    position: relative !important;
    overflow: hidden !important;
  }

  .submit-btn:hover {
    background: linear-gradient(135deg, #40a9ff 0%, #1890ff 100%) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 16px rgba(24, 144, 255, 0.4) !important;
  }

  .submit-btn:active {
    transform: translateY(-1px) !important;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3) !important;
  }

  .submit-btn:focus {
    outline: none !important;
    box-shadow:
      0 6px 16px rgba(24, 144, 255, 0.4),
      0 0 0 2px rgba(24, 144, 255, 0.2) !important;
  }

  .target-modal {
    .ant-modal-content {
      border-radius: 8px;
      overflow: hidden;
    }

    .ant-modal-header {
      background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
      border-radius: 8px 8px 0 0;
    }

    .ant-modal-title {
      color: white;
      font-weight: 600;
    }

    @media (max-width: 767px) {
      .ant-modal {
        margin: 16px;
        max-width: calc(100vw - 32px);
      }
    }
  }

  .target-type-radio {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .target-type-option {
    padding: 12px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    margin: 0;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;

    @media (max-width: 575px) {
      padding: 8px;
    }
  }

  .target-type-option:hover {
    border-color: #1890ff;
    background: #f0f9ff;
  }

  .target-type-option.ant-radio-wrapper-checked {
    border-color: #1890ff;
    background: #e6f7ff;
  }

  .target-type-icon {
    font-size: 18px;
    margin-right: 8px;
    flex-shrink: 0;

    @media (max-width: 575px) {
      font-size: 16px;
      margin-right: 6px;
    }
  }

  .target-type-label {
    @media (max-width: 575px) {
      font-size: 14px;
    }
  }

  .target-fields-section {
    background: #f8f9fa;
    padding: 16px;
    border-radius: 6px;
    margin-top: 16px;

    @media (max-width: 575px) {
      padding: 12px;
    }
  }

  .flex-items {
    display: flex;
    align-items: center;
  }

  /* Responsive utilities */
  @media (max-width: 575px) {
    .ant-col {
      margin-bottom: 8px;
    }

    .ant-form-item {
      margin-bottom: 12px;
    }

    .division-card .ant-card-body {
      padding: 8px;
    }

    .goals-section {
      padding: 8px;
    }

    .goal-item {
      padding: 6px;
    }
  }

  @media (max-width: 767px) {
    .submit-btn {
      width: 100%;
      max-width: 300px;
    }
  }

  /* Hide number input arrows */
  .no-arrows input[type='number']::-webkit-outer-spin-button,
  .no-arrows input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .no-arrows input[type='number'] {
    -moz-appearance: textfield;
  }

  .division-number-col {
    padding-top: 25px;
  }

  .ant-card-bordered {
    background: transparent;
  }
`;
