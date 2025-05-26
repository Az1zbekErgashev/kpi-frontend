import styled from 'styled-components';

export const StyledSitebar = styled.div`
  .sidebar {
    width: 250px;
    height: 100vh;
    background: linear-gradient(135deg, #ffffff 0%, #f8fbff 50%, #ffffff 100%);
    color: #2c3e50;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 30px rgba(77, 167, 222, 0.1);
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    overflow: hidden;
    border-right: 1px solid rgba(255, 255, 255, 0.8);
  }

  .sidebar::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.9) 0%, rgba(77, 167, 222, 0.05) 100%);
    pointer-events: none;
  }

  .sidebar::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 20%,
      rgba(77, 167, 222, 0.3) 50%,
      rgba(255, 255, 255, 0.8) 80%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  .sidebar.collapsed {
    width: 70px;
    margin-left: 0px;

    .logo {
      padding: 0px;
      display: flex;
      justify-content: center;
      h2 {
        display: none;
      }

      svg {
        width: 30px !important;
        height: 30px !important;
      }
    }
  }

  .logo {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    height: 70px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%);
    backdrop-filter: blur(10px);
  }

  .logo h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
  }

  .toggleButton {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
    border: 1px solid rgba(255, 255, 255, 0.8);
    color: #4da7de;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 8px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
  }

  .toggleButton::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(77, 167, 222, 0.1) 100%);
    opacity: 0;
    border-radius: 8px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .toggleButton:hover::before {
    opacity: 1;
  }

  .toggleButton svg {
    position: relative;
    z-index: 1;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
  }

  .toggleButton:hover svg {
    transform: scale(1.1) rotate(180deg);
  }

  .navigation {
    flex: 1;
    overflow-y: auto;
    padding: 15px 0;
    position: relative;
  }

  .navigation::-webkit-scrollbar {
    width: 5px;
  }

  .navigation::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.3);
  }

  .navigation::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(77, 167, 222, 0.3));
    border-radius: 10px;
  }

  .navigation ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .navigation li {
    margin-bottom: 5px;
    position: relative;
  }

  .navigation a {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    color: #5a6a7e;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 0 25px 25px 0;
    margin: 0 0 0 10px;
    font-weight: 500;
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(5px);
  }

  .sidebar.collapsed .navigation a {
    padding: 15px;
    margin: 0 5px;
    border-radius: 12px;
    justify-content: center;
  }

  .navigation a::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(255, 255, 255, 0.6) 50%,
      rgba(77, 167, 222, 0.1) 100%
    );
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 0 25px 25px 0;
  }

  .navigation a:hover::before {
    opacity: 1;
  }

  .navigation a.active {
    color: #4da7de;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(255, 255, 255, 0.7) 50%,
      rgba(77, 167, 222, 0.15) 100%
    );
    box-shadow: 0 2px 15px rgba(255, 255, 255, 0.4);
  }

  .navigation a.active::before {
    opacity: 1;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(255, 255, 255, 0.7) 50%,
      rgba(77, 167, 222, 0.2) 100%
    );
  }

  .navigation a.active::after {
    content: '';
    position: absolute;
    top: 0;
    left: -10px;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, #4da7de 50%, rgba(255, 255, 255, 0.9) 100%);
    border-radius: 0 4px 4px 0;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
  }

  .navigation a svg {
    margin-right: 15px;
    width: 18px;
    height: 18px;
    color: #7a8a9a;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3));
  }

  .sidebar.collapsed .navigation a svg {
    width: 24px;
    height: 24px;
    margin-right: 0;
  }

  .navigation a:hover svg {
    color: #4da7de;
    transform: translateX(3px);
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.8));
  }

  .navigation a.active svg {
    color: #4da7de;
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.8));
  }

  .linkText {
    position: relative;
    z-index: 1;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  }

  .navigation a:hover .linkText {
    transform: translateX(3px);
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
  }

  .navigation a.active .linkText {
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
  }

  .sidebar.collapsed .linkText {
    display: none;
  }

  .sidebarFooter {
    padding: 15px 20px;
    font-size: 0.8rem;
    text-align: center;
    color: #7a8a9a;
    position: relative;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%);
    backdrop-filter: blur(10px);
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }

  .sidebarFooter::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(77, 167, 222, 0.4) 50%,
      rgba(255, 255, 255, 0.8) 100%
    );
  }

  .sidebar.collapsed .sidebarFooter {
    display: none;
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    .sidebar {
      width: 70px;
    }

    .sidebar .linkText,
    .sidebar .logo h2,
    .sidebar .sidebarFooter {
      display: none;
    }

    .sidebar.collapsed {
      transform: translateX(-100%);
    }
  }

  /* Animation for menu items */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .navigation li {
    animation: fadeIn 0.5s ease forwards;
    animation-delay: calc(0.05s * var(--index, 0));
    opacity: 0;
  }

  .navigation li:nth-child(1) {
    --index: 1;
  }

  .navigation li:nth-child(2) {
    --index: 2;
  }

  .navigation li:nth-child(3) {
    --index: 3;
  }

  .navigation li:nth-child(4) {
    --index: 4;
  }

  .navigation li:nth-child(5) {
    --index: 5;
  }

  .sidebar.collapsed .navigation a:hover {
    transform: scale(1.1);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(77, 167, 222, 0.2) 100%);
  }

  .sidebar.collapsed .navigation a.active {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(77, 167, 222, 0.25) 100%);
    transform: scale(1.05);
  }

  .sidebar.collapsed .toggleButton {
    padding: 12px;
  }

  .sidebar.collapsed .toggleButton svg {
    width: 20px;
    height: 20px;
  }
`;
