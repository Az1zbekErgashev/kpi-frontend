import styled from 'styled-components';

export const StyledNavbar = styled.div`
  .navbar {
    height: 70px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%);
    backdrop-filter: blur(15px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-shadow: 0 4px 25px rgba(255, 255, 255, 0.3);
    position: fixed;
    top: 0;
    right: 0;
    left: 0px;
    z-index: 99;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.8);

    &.collapsed {
    }
  }

  .navbar::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.4) 0%, transparent 50%);
    pointer-events: none;
  }

  .searchContainer {
    position: relative;
    width: 300px;
  }

  .searchInput {
    width: 100%;
    padding: 10px 15px 10px 40px;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    font-size: 14px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
  }

  .searchInput:focus {
    outline: none;
    border-color: #4da7de;
    box-shadow:
      0 0 0 3px rgba(255, 255, 255, 0.8),
      0 0 15px rgba(77, 167, 222, 0.2);
    background: rgba(255, 255, 255, 0.95);
  }

  .searchIcon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #9e9e9e;
    width: 18px;
    height: 18px;
    transition: all 0.3s ease;
    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
  }

  .searchInput:focus + .searchIcon {
    color: #4da7de;
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.8));
  }

  .navActions {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .notifications {
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 8px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(5px);
  }

  .notifications:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 15px rgba(255, 255, 255, 0.5);
  }

  .badge {
    position: absolute;
    top: -2px;
    right: -2px;
    background: linear-gradient(135deg, #ff5252, #ff7b7b, rgba(255, 255, 255, 0.3));
    color: white;
    font-size: 10px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(255, 255, 255, 0.4);
    animation: pulse 2s infinite;
    border: 1px solid rgba(255, 255, 255, 0.8);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.6);
    }
    70% {
      box-shadow: 0 0 0 6px rgba(255, 255, 255, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
  }

  .dropdown {
    position: relative;
  }

  .dropdownToggle {
    display: flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%);
    border: 1px solid rgba(255, 255, 255, 0.8);
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 8px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
  }

  .dropdownToggle:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(255, 255, 255, 0.5);
  }

  .userAvatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4da7de, #78c8ff, rgba(255, 255, 255, 0.3));
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 2px 15px rgba(255, 255, 255, 0.4);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.8);
  }

  .userAvatar::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0));
    transform: rotate(45deg);
    transition: all 0.6s ease;
  }

  .dropdownToggle:hover .userAvatar::before {
    transform: rotate(225deg);
  }

  .userName {
    font-weight: 500;
    transition: all 0.3s ease;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }

  .dropdownToggle:hover .userName {
    color: #4da7de;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
  }

  .currentLanguage {
    font-weight: 500;
    transition: all 0.3s ease;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }

  .dropdownMenu {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    width: 200px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%);
    backdrop-filter: blur(15px);
    border-radius: 12px;
    box-shadow: 0 5px 30px rgba(255, 255, 255, 0.4);
    padding: 8px 0;
    z-index: 100;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.8);
  }

  .dropdown:hover .dropdownMenu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .dropdownItem {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 15px;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .dropdownItem::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(255, 255, 255, 0.6) 50%,
      rgba(77, 167, 222, 0.1) 100%
    );
    transition: width 0.3s ease;
  }

  .dropdownItem:hover::before {
    width: 100%;
  }

  .dropdownItem svg {
    color: #7a8a9a;
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3));
  }

  .dropdownItem:hover svg {
    color: #4da7de;
    transform: translateX(3px);
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.8));
  }

  .dropdownItem span {
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
    text-shadow: 0 0 3px rgba(255, 255, 255, 0.3);
  }

  .dropdownItem:hover span {
    color: #4da7de;
    transform: translateX(3px);
    text-shadow: 0 0 6px rgba(255, 255, 255, 0.6);
  }

  .divider {
    height: 1px;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(77, 167, 222, 0.3) 50%,
      rgba(255, 255, 255, 0.8) 100%
    );
    margin: 8px 0;
  }

  @media (max-width: 768px) {
    .navbar {
      left: 70px;
    }

    .searchContainer {
      width: 200px;
    }

    .userName {
      display: none;
    }
  }

  @media (max-width: 576px) {
    .searchContainer {
      width: 150px;
    }

    .currentLanguage {
      display: none;
    }
  }
`;
