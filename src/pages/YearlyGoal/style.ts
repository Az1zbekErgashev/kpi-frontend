import styled from 'styled-components';

export const StyledYearlyGoal = styled.div`
  .submit-section {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 12px;
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
`;
