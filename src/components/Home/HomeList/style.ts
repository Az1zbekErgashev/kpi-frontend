import styled from 'styled-components';

export const StyledHomeList = styled.div`
  .status {
    display: flex;
    justify-content: center;
    .active_status,
    .inactive_status {
      padding: 5px 10px;
      width: max-content;
      border-radius: 5px;
      display: flex;
      align-items: center;
      gap: 5px;
      .span {
        border-radius: 5px;
        height: 7px;
        width: 7px;
      }
    }

    .active_status {
      background: rgba(42, 168, 42, 0.37);
      color: rgb(55, 97, 55);
      .span {
        background: rgba(42, 168, 42, 0.7);
      }
    }
  }
`;
