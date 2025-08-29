import styled from 'styled-components';

export const StyledGoalTable = styled.div`
  .table-wrapper {
    border: 1px solid #d1d5db;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    white-space: pre-line;
  }

  .kpi-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  .header-row {
    background-color: #f8fafc;
  }

  .main-header {
    padding: 12px;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    color: #1f2937;
    border-bottom: 1px solid #d1d5db;
  }

  .sub-header-row {
    background-color: #f1f5f9;
  }

  .empty-header {
    border-bottom: 1px solid #d1d5db;
    border-right: 1px solid #d1d5db;
  }

  .year-header {
    padding: 8px 12px;
    text-align: center;
    font-weight: 500;
    color: #374151;
    border-bottom: 1px solid #d1d5db;
  }

  .column-headers {
    background-color: #e2e8f0;
  }

  .column-headers th {
    padding: 10px 12px;
    text-align: center;
    font-weight: 600;
    color: #1f2937;
    border-bottom: 1px solid #d1d5db;
    border-right: 1px solid #d1d5db;
  }

  .column-headers th:last-child {
    border-right: none;
  }

  .category-header {
    width: 15%;
    background-color: #ddd6fe;
  }

  .ratio-header {
    width: 10%;
    background-color: #ddd6fe;
  }

  .content-header {
    width: 50%;
    background-color: #e0f2fe;
  }

  .target-header {
    width: 25%;
    background-color: #e0f2fe;
  }

  .even-row {
    background-color: #f8fafc;
  }

  .odd-row {
    background-color: #ffffff;
  }

  .category-cell {
    padding: 12px;
    text-align: center;
    font-weight: 600;
    color: #1f2937;
    border-right: 1px solid #d1d5db;
    border-bottom: 1px solid #d1d5db;
    background-color: #f1f5f9;
    vertical-align: middle;
  }

  .ratio-cell {
    padding: 12px;
    text-align: center;
    font-weight: 600;
    color: #1f2937;
    border-right: 1px solid #d1d5db;
    border-bottom: 1px solid #d1d5db;
    background-color: #f1f5f9;
    vertical-align: middle;
  }

  .content-cell {
    padding: 12px;
    border-right: 1px solid #d1d5db;
    border-bottom: 1px solid #d1d5db;
    vertical-align: top;
  }

  .target-cell {
    padding: 12px;
    border-bottom: 1px solid #d1d5db;
    vertical-align: top;
  }

  .goal-content {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }

  .checkmark {
    color: #10b981;
    font-weight: bold;
    font-size: 16px;
    margin-top: 1px;
  }

  .goal-text {
    color: #374151;
    line-height: 1.5;
  }

  .target-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .target-text {
    color: #1f2937;
    font-weight: 500;
  }

  .evaluation-text {
    color: #6b7280;
    font-size: 12px;
  }

  .comments-section {
    margin-top: 24px;
    padding: 16px;
    background-color: #f9fafb;
    border-radius: 4px;
    border: 1px solid #e5e7eb;
  }

  .comments-section h3 {
    margin: 0 0 12px 0;
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
  }

  .comment-item {
    padding: 8px 0;
    border-bottom: 1px solid #e5e7eb;
  }

  .comment-item:last-child {
    border-bottom: none;
  }

  .comment-content {
    color: #374151;
    margin-bottom: 4px;
  }

  .comment-status {
    color: #6b7280;
    font-size: 12px;
  }

  @media (max-width: 768px) {
    .kpi-table-container {
      margin: 10px;
    }

    .kpi-table {
      font-size: 12px;
    }

    .main-header {
      font-size: 14px;
      padding: 8px;
    }

    .column-headers th {
      padding: 8px 6px;
    }

    .category-cell,
    .ratio-cell,
    .content-cell,
    .target-cell {
      padding: 8px 6px;
    }

    .goal-content {
      flex-direction: column;
      gap: 4px;
    }

    .checkmark {
      align-self: flex-start;
    }
  }
  .title-text {
    font-size: 16px;
    color: rgba(58, 123, 213, 0.95);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }
`;
