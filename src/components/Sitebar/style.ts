import styled from 'styled-components';

export const StyledSitebar = styled.div`
 .magnificent-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 250px;
  height: 100vh;
  z-index: 1000;
}

.sidebar-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    145deg,
    rgba(58, 123, 213, 0.95) 0%,
    rgba(45, 108, 198, 0.98) 25%,
    rgba(32, 93, 183, 0.96) 50%,
    rgba(58, 123, 213, 0.98) 75%,
    rgba(70, 138, 228, 0.95) 100%
  );
  backdrop-filter: blur(25px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 4px 0 30px rgba(58, 123, 213, 0.3);
}

.sidebar-background::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.25) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(58, 123, 213, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 40% 60%, rgba(70, 138, 228, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 60% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 40%);
  animation: backgroundShift 15s ease-in-out infinite;
}

@keyframes backgroundShift {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.sidebar-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
}

/* Logo Section */
.logo-section {
  position: relative;
  padding: 28px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 2;
}

.logo-icon {
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.9) 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 8px 32px rgba(255, 255, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.logo-icon::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(58, 123, 213, 0.2) 50%, transparent 70%);
  animation: logoShine 2.5s ease-in-out infinite;
}

@keyframes logoShine {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  50% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
  100% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
}

.logo-svg {
  color: #3a7bd5;
  filter: drop-shadow(0 2px 8px rgba(58, 123, 213, 0.4));
  z-index: 1;
  position: relative;
}

.logo-text h2 {
  margin: 0;
  font-size: 26px;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  letter-spacing: -0.5px;
}

.logo-text span {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 140px;
  height: 140px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  animation: logoGlow 3s ease-in-out infinite;
}

@keyframes logoGlow {
  0%,
  100% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

/* Navigation */
.navigation {
  flex: 1;
  padding: 24px 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.navigation::-webkit-scrollbar {
  width: 6px;
}

.navigation::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.navigation::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.navigation::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

.nav-header {
  padding: 0 24px 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.7);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 2px;
}

.nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  margin: 0 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.9);
}

.nav-link::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
  opacity: 0;
  transition: all 0.3s ease;
  border-radius: 16px;
  z-index: 1; 
}

.nav-link:hover::before {
  opacity: 0.7;
}

.nav-link:hover {
  transform: translateX(6px);
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
}

.nav-link.active {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
  color: #ffffff;
  transform: translateX(6px);
}

.nav-link.active .nav-icon {
  color: #ffffff;
}

.nav-link-content {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  z-index: 2;
  width: 100%; 
  padding: 0 8px; 
  cursor: pointer; 
}

.nav-icon {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
}

.nav-text {
  font-size: 14px;
  font-weight: 400;
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.chevron-container {
  position: relative;
  z-index: 2;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  cursor: pointer; /* Ensure chevron is clickable */
}

.nav-link:hover .chevron-container {
  color: rgba(255, 255, 255, 0.9);
}

.nav-link-glow {
  position: absolute;
  top: 50%;
  left: 0;
  width: 2px;
  height: 0;
  background: linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0.8));
  border-radius: 0 2px 2px 0;
  transition: height 0.3s ease;
  transform: translateY(-50%);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  pointer-events: none; /* Prevent glow from blocking clicks */
  z-index: 1; /* Ensure it’s behind content */
}

.nav-link.active .nav-link-glow {
  height: 70%;
}

/* Submenu */
.submenu {
  list-style: none;
  padding: 0;
  margin: 12px 0 0 0;
  overflow: hidden;
}

.submenu-item {
  margin-bottom: 4px;
}

.submenu-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 16px 6px 40px;
  margin: 0 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 500;
  position: relative;
}

.submenu-link:hover {
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.95);
  transform: translateX(2px);
}

.submenu-link.active {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  box-shadow: 0 4px 16px rgba(255, 255, 255, 0.1);
}

.submenu-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
}

.submenu-link:hover .submenu-dot,
.submenu-link.active .submenu-dot {
  background: #ffffff;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
}

/* Footer */
.sidebar-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
}

.footer-content {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.footer-avatar {
  position: relative;
  width: 44px;
  height: 44px;
}

.avatar-image {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.9) 100%);
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(255, 255, 255, 0.2);
}

.avatar-image::before {
  content: '';
  position: absolute;
  top: 30%;
  left: 50%;
  width: 14px;
  height: 14px;
  background: #3a7bd5;
  border-radius: 50%;
  transform: translateX(-50%);
}

.avatar-image::after {
  content: '';
  position: absolute;
  bottom: 20%;
  left: 50%;
  width: 22px;
  height: 17px;
  background: #3a7bd5;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  transform: translateX(-50%);
}

.avatar-status {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #10b981;
  border: 3px solid rgba(58, 123, 213, 0.9);
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.8);
}

.footer-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.footer-name {
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.footer-role {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.footer-year {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  padding: 16px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-weight: 500;
}

/* Responsive */

/* Enhanced hover effects */
.nav-link:hover {
  transform: translateX(6px);
}

.nav-link:hover .nav-icon {
  transform: rotate(5deg);
}

.nav-link:hover .nav-text {
  transform: translateX(2px);
}

/* Focus states for accessibility */
.submenu-link:focus {
  outline: 1px solid rgba(255, 255, 255, 0.6);
  outline-offset: 1px;
}

/* Additional glow effects */
.nav-link.active::after {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
  border-radius: 18px;
  z-index: -1;
  opacity: 0.5;
}

.submenu-link:hover .submenu-dot,
.submenu-link.active .submenu-dot {
  background: #ffffff;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
}
`;
