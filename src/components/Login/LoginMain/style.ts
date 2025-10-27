
import styled from 'styled-components';

export const StyledLoginMain = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;

  /* Background Effects */
  .background-effect {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
  }

  .gradient-circle {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
    animation: float 20s ease-in-out infinite;
  }

  .circle-1 {
    width: 500px;
    height: 500px;
    background: rgba(99, 102, 241, 0.5);
    top: -250px;
    left: -250px;
    animation-delay: 0s;
  }

  .circle-2 {
    width: 400px;
    height: 400px;
    background: rgba(236, 72, 153, 0.5);
    bottom: -200px;
    right: -200px;
    animation-delay: 7s;
  }

  .circle-3 {
    width: 300px;
    height: 300px;
    background: rgba(139, 92, 246, 0.5);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: 14s;
  }

  @keyframes float {
    0%, 100% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(30px, -30px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
  }

  .particles {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    animation: particle-float 15s infinite ease-in-out;
  }

  .particle:nth-child(odd) {
    animation-duration: 20s;
  }

  .particle:nth-child(even) {
    animation-duration: 25s;
  }

  @keyframes particle-float {
    0%, 100% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) translateX(50px);
      opacity: 0;
    }
  }

  .particle:nth-child(1) { left: 10%; animation-delay: 0s; }
  .particle:nth-child(2) { left: 20%; animation-delay: 2s; }
  .particle:nth-child(3) { left: 30%; animation-delay: 4s; }
  .particle:nth-child(4) { left: 40%; animation-delay: 6s; }
  .particle:nth-child(5) { left: 50%; animation-delay: 8s; }
  .particle:nth-child(6) { left: 60%; animation-delay: 10s; }
  .particle:nth-child(7) { left: 70%; animation-delay: 12s; }
  .particle:nth-child(8) { left: 80%; animation-delay: 14s; }
  .particle:nth-child(9) { left: 90%; animation-delay: 16s; }
  .particle:nth-child(10) { left: 15%; animation-delay: 1s; }
  .particle:nth-child(11) { left: 25%; animation-delay: 3s; }
  .particle:nth-child(12) { left: 35%; animation-delay: 5s; }
  .particle:nth-child(13) { left: 45%; animation-delay: 7s; }
  .particle:nth-child(14) { left: 55%; animation-delay: 9s; }
  .particle:nth-child(15) { left: 65%; animation-delay: 11s; }
  .particle:nth-child(16) { left: 75%; animation-delay: 13s; }
  .particle:nth-child(17) { left: 85%; animation-delay: 15s; }
  .particle:nth-child(18) { left: 95%; animation-delay: 17s; }
  .particle:nth-child(19) { left: 5%; animation-delay: 19s; }
  .particle:nth-child(20) { left: 50%; animation-delay: 21s; }

  /* Language Switcher */
  .language-switcher-container {
    position: absolute;
    top: 30px;
    right: 30px;
    z-index: 100;
  }

  /* Login Wrapper */
  .login-wrapper {
    position: relative;
    z-index: 10;
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 1100px;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    animation: slideUp 0.6s ease-out;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Image Side */
  .image-side {
    position: relative;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 60px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><path d="M0,100 C150,200 350,0 600,100 C850,200 1050,0 1200,100 L1200,600 L0,600 Z" fill="rgba(255,255,255,0.05)"/></svg>');
    background-size: cover;
    opacity: 0.5;
  }

  .content-overlay {
    position: relative;
    z-index: 2;
    color: white;
  }

  .brand-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 48px;
    font-weight: 800;
    margin-bottom: 40px;
    animation: fadeInLeft 0.8s ease-out 0.2s both;
  }

  .logo-text {
    background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .logo-dot {
    width: 12px;
    height: 12px;
    background: #fbbf24;
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.7;
    }
  }

  .image-side h2 {
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 20px;
    line-height: 1.2;
    animation: fadeInLeft 0.8s ease-out 0.4s both;
  }

  .image-side p {
    font-size: 18px;
    opacity: 0.95;
    line-height: 1.6;
    animation: fadeInLeft 0.8s ease-out 0.6s both;
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* Login Content */
  .login-content {
    padding: 60px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: white;
    animation: fadeInRight 0.8s ease-out 0.4s both;
  }

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .login-header {
    margin-bottom: 40px;
  }

  .login-header h1 {
    font-size: 32px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 8px;
  }

  .login-header p {
    font-size: 16px;
    color: #6b7280;
  }

  /* Responsive Design */
  @media (max-width: 968px) {
    .login-wrapper {
      grid-template-columns: 1fr;
      max-width: 500px;
    }

    .image-side {
      display: none;
    }

    .login-content {
      padding: 50px 40px;
    }
  }

  @media (max-width: 640px) {
    padding: 20px;

    .login-content {
      padding: 40px 30px;
    }

    .login-header h1 {
      font-size: 28px;
    }

    .language-switcher-container {
      top: 20px;
      right: 20px;
    }
  }
`;