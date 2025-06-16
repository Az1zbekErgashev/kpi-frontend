import styled from 'styled-components';
import LoginPhoto from 'assets/images/LoginPhoto.webp';
export const StyledLoginPage = styled.div`
  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    padding: 20px;
  }

  /* Background Effects */
  .background-effect {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    overflow: hidden;
  }

  .gradient-circle {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
  }

  .circle-1 {
    width: 600px;
    height: 600px;
    background: linear-gradient(135deg, rgba(58, 123, 213, 0.4) 0%, rgba(0, 210, 255, 0.2) 100%);
    top: -200px;
    left: -100px;
    animation: float-slow 15s ease-in-out infinite alternate;
  }

  .circle-2 {
    width: 500px;
    height: 500px;
    background: linear-gradient(135deg, rgba(0, 210, 255, 0.3) 0%, rgba(58, 123, 213, 0.1) 100%);
    bottom: -150px;
    right: -100px;
    animation: float-slow 18s ease-in-out infinite alternate-reverse;
  }

  .circle-3 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, rgba(58, 123, 213, 0.2) 0%, rgba(0, 210, 255, 0.1) 100%);
    top: 40%;
    left: 60%;
    animation: float-slow 20s ease-in-out infinite alternate;
  }

  @keyframes float-slow {
    0% {
      transform: translate(0, 0) scale(1);
    }
    50% {
      transform: translate(30px, 20px) scale(1.05);
    }
    100% {
      transform: translate(-20px, 10px) scale(0.95);
    }
  }

  /* Particles */
  .particles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
  }

  .particle {
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    width: 4px;
    height: 4px;
    animation: particle-animation 8s infinite linear;
  }

  @keyframes particle-animation {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      transform: translateY(-150vh) translateX(40px);
      opacity: 0;
    }
  }

  /* 20 ускоренных частиц */
  .particle-1 {
    left: 10%;
    top: 90%;
    animation-delay: 0s;
    animation-duration: 5s;
  }
  .particle-2 {
    left: 20%;
    top: 80%;
    animation-delay: 1s;
    animation-duration: 6s;
  }
  .particle-3 {
    left: 30%;
    top: 70%;
    animation-delay: 2s;
    animation-duration: 4s;
  }
  .particle-4 {
    left: 40%;
    top: 80%;
    animation-delay: 3s;
    animation-duration: 6s;
  }
  .particle-5 {
    left: 50%;
    top: 90%;
    animation-delay: 4s;
    animation-duration: 7s;
  }
  .particle-6 {
    left: 60%;
    top: 80%;
    animation-delay: 5s;
    animation-duration: 5s;
  }
  .particle-7 {
    left: 70%;
    top: 70%;
    animation-delay: 6s;
    animation-duration: 6s;
  }
  .particle-8 {
    left: 80%;
    top: 80%;
    animation-delay: 7s;
    animation-duration: 5s;
  }
  .particle-9 {
    left: 90%;
    top: 90%;
    animation-delay: 8s;
    animation-duration: 4s;
  }
  .particle-10 {
    left: 5%;
    top: 95%;
    animation-delay: 9s;
    animation-duration: 7s;
  }
  .particle-11 {
    left: 15%;
    top: 85%;
    animation-delay: 0.5s;
    animation-duration: 6s;
  }
  .particle-12 {
    left: 25%;
    top: 75%;
    animation-delay: 1.5s;
    animation-duration: 5s;
  }
  .particle-13 {
    left: 35%;
    top: 85%;
    animation-delay: 2.5s;
    animation-duration: 8s;
  }
  .particle-14 {
    left: 45%;
    top: 95%;
    animation-delay: 3.5s;
    animation-duration: 4s;
  }
  .particle-15 {
    left: 55%;
    top: 85%;
    animation-delay: 4.5s;
    animation-duration: 6s;
  }
  .particle-16 {
    left: 65%;
    top: 75%;
    animation-delay: 5.5s;
    animation-duration: 5s;
  }
  .particle-17 {
    left: 75%;
    top: 85%;
    animation-delay: 6.5s;
    animation-duration: 7s;
  }
  .particle-18 {
    left: 85%;
    top: 95%;
    animation-delay: 7.5s;
    animation-duration: 8s;
  }
  .particle-19 {
    left: 95%;
    top: 85%;
    animation-delay: 8.5s;
    animation-duration: 5s;
  }
  .particle-20 {
    left: 2%;
    top: 98%;
    animation-delay: 9.5s;
    animation-duration: 6s;
  }

  /* Language Switcher */
  .language-switcher-container {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 10;
  }

  .language-switcher {
    position: relative;
  }

  .language-button {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 8px 16px;
    border-radius: 30px;
    cursor: pointer;
    color: var(--text-color);
    font-size: 14px;
    box-shadow: 0 4px 15px var(--shadow);
    transition: var(--transition);
  }

  .language-button:hover {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 6px 20px var(--shadow);
  }

  .globe-icon {
    margin-right: 8px;
  }

  .dropdown-arrow {
    margin-left: 8px;
    transition: var(--transition);
  }

  .dropdown-arrow.open {
    transform: rotate(180deg);
  }

  .language-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 8px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    box-shadow: 0 8px 30px var(--shadow);
    overflow: hidden;
    width: 150px;
    z-index: 100;
  }

  .language-option {
    display: block;
    width: 100%;
    padding: 12px 16px;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-color);
    transition: var(--transition);
    font-size: 14px;
  }

  .language-option:hover {
    background: rgba(58, 123, 213, 0.1);
  }

  .language-option.active {
    background: rgba(58, 123, 213, 0.15);
    color: var(--primary-blue);
    font-weight: 500;
  }

  /* Login Wrapper - Split Screen Layout */
  .login-wrapper {
    display: flex;
    width: 100%;
    max-width: 900px;
    height: 600px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 25px 75px rgba(58, 123, 213, 0.25);
    z-index: 2;
    position: relative;
    background-image: url(${LoginPhoto});
    background-size: cover;
    width: 100%;
  }

  /* Image Side */
  .image-side {
    flex: 1;
    position: relative;
    background-image: url('/placeholder.svg?height=600&width=450');
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 40px;
    color: white;
    overflow: hidden;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(45, 92, 169, 0.4), rgba(58, 123, 213, 0.8));
    z-index: 1;
  }

  .content-overlay {
    position: relative;
    z-index: 2;
  }

  .brand-logo {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .logo-text {
    font-size: 32px;
    font-weight: 700;
    color: white;
    letter-spacing: 1px;
  }

  .logo-dot {
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
    margin-left: 2px;
  }

  .image-side h2 {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .image-side p {
    font-size: 16px;
    opacity: 0.9;
    max-width: 280px;
  }

  /* Login Content */
  .login-content {
    flex: 1;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .login-header {
    text-align: center;
    margin-bottom: 30px;
  }

  .login-header h1 {
    color: var(--text-color);
    font-size: 24px;
    margin-bottom: 8px;
    font-weight: 600;
  }

  .login-header p {
    color: var(--text-light);
    font-size: 16px;
  }

  /* Form Styles */
  .form-container {
    width: 100%;
  }

  .form-group {
    margin-bottom: 24px;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: var(--text-color);
    font-weight: 500;
  }

  .input-wrapper {
    position: relative;
  }

  .glass-input {
    width: 100%;
    padding: 14px 16px 14px 45px;
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(219, 228, 255, 0.8);
    border-radius: 12px;
    font-size: 15px;
    transition: var(--transition);
    color: var(--text-color);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  }

  .glass-input:focus {
    outline: none;
    border-color: var(--input-focus);
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 5px 15px rgba(58, 123, 213, 0.1);
  }

  .glass-input::placeholder {
    color: #a0aec0;
  }

  .input-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-light);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Form Options */
  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    font-size: 14px;
  }

  .remember-me {
    display: flex;
    align-items: center;
  }

  .remember-me input[type='checkbox'] {
    margin-right: 8px;
    accent-color: var(--primary-blue);
  }

  .forgot-password {
    color: var(--primary-blue);
    text-decoration: none;
    transition: var(--transition);
  }

  .forgot-password:hover {
    text-decoration: underline;
  }

  /* Button Styles */
  .form-actions {
    margin-top: 10px;
  }

  .login-button {
    width: 100%;
    padding: 14px;
    background: linear-gradient(90deg, var(--primary-blue), var(--secondary-blue));
    color: var(--white);
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: 0 4px 15px rgba(58, 123, 213, 0.3);
    position: relative;
    overflow: hidden;
  }

  .login-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: var(--transition);
  }

  .login-button:hover {
    box-shadow: 0 6px 20px rgba(58, 123, 213, 0.4);
    transform: translateY(-2px);
  }

  .login-button:hover::before {
    left: 100%;
    transition: 0.7s;
  }

  .login-button:active {
    transform: translateY(0);
  }

  /* Loading Animation */
  .login-button.loading {
    background: linear-gradient(90deg, var(--primary-blue), var(--secondary-blue));
    cursor: not-allowed;
  }

  .loader {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 0.8s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Social Login */
  .social-login {
    margin-top: 30px;
  }

  .divider {
    display: flex;
    align-items: center;
    text-align: center;
    margin-bottom: 20px;
  }

  .divider::before,
  .divider::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid rgba(127, 140, 141, 0.2);
  }

  .divider span {
    padding: 0 10px;
    font-size: 14px;
    color: var(--text-light);
  }

  .social-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
  }

  .social-button {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    border: 1px solid rgba(219, 228, 255, 0.8);
    background: rgba(255, 255, 255, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
  }

  .social-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  /* Responsive Styles */
  @media (max-width: 900px) {
    .login-wrapper {
      flex-direction: column;
      height: auto;
      max-width: 450px;
    }

    .image-side {
      height: 200px;
      padding: 20px;
    }

    .login-content {
      padding: 30px 20px;
    }
  }

  @media (max-width: 480px) {
    .login-wrapper {
      box-shadow: none;
      background: transparent;
    }

    .image-side {
      border-radius: 20px 20px 0 0;
    }

    .login-content {
      border-radius: 0 0 20px 20px;
    }

    .form-options {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }

    .language-switcher-container {
      top: 10px;
      right: 10px;
    }
  }

  .select-item-language {
    display: flex;
    align-items: center;
    gap: 15px;
  }
`;
