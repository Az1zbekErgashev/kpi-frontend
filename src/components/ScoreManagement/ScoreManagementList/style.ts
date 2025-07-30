import { styled } from 'styled-components';

export const StyledScoreManagementList = styled.div`
  .grade-column {
    font-size: 18px;
  }
  .score-status-active {
    border: 1px solid #67cc6bff;
    border-radius: 4px;
    background: #67cc6aab;
    width: fit-content;
    padding: 2px 8px;
  }
  .score-status-inactive {
    border: 1px solid #ff4545ff;
    border-radius: 4px;
    background: #ff26265d;
    width: fit-content;
    padding: 2px 8px;
  }
  .flex-column {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
