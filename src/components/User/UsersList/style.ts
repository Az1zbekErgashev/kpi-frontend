import styled from 'styled-components';

export const StyledUsersList = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  max-width: 100%;
  
  .ant-table {
    min-width: 1000px;
    
    .ant-table-tbody > tr:nth-child(even) {
        background-color: #ffffff;  
    }
    
    .ant-table-tbody > tr:nth-child(odd) {
      background-color: #ffffff;  
    }
    
    /* Optional: Hover effect */
    .ant-table-tbody > tr:hover {
      background-color: #f0f0f0 !important;
    }
  }
`;