import styled from 'styled-components';

export const StyledProfile = styled.div`
  .content-wrapper {
    max-width: 42rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .header {
    text-align: center;
    margin-bottom: 1rem;
  }

  .header h1 {
    font-size: 1.875rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.5rem;
  }

  .header p {
    color: #6b7280;
    font-size: 1rem;
  }

  .card {
    background: white;
    border-radius: 0.5rem;
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);
    overflow: hidden;
  }

  .card-header {
    padding: 1.5rem 1.5rem 0 1.5rem;
  }

  .card-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.5rem;
  }

  .card-description {
    color: #6b7280;
    font-size: 0.875rem;
  }

  .card-content {
    padding: 1.5rem;
  }

  /* Form */
  .form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
  }

  .input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    transition:
      border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;
  }

  .input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .input-description {
    font-size: 0.75rem;
    color: #6b7280;
  }

  /* Password input with toggle */
  .password-input-wrapper {
    position: relative;
  }

  .password-toggle {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    padding: 0 0.75rem;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #6b7280;
  }

  .password-toggle:hover {
    color: #374151;
  }

  /* Checkbox */
  .checkbox-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .checkbox {
    width: 1rem;
    height: 1rem;
    accent-color: #3b82f6;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
  }

  /* Password section */
  .password-section {
    margin-left: 1.5rem;
    padding: 1rem;
    background-color: #f9fafb;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  /* Separator */
  .separator {
    height: 1px;
    background-color: #e5e7eb;
    margin: 0.5rem 0;
  }

  /* Buttons */
  .button {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease-in-out;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: none;
  }

  .button-primary {
    background-color: #3b82f6;
    color: white;
  }

  .button-primary:hover {
    background-color: #2563eb;
  }

  .button-outline {
    background-color: white;
    color: #374151;
    border: 1px solid #d1d5db;
  }

  .button-outline:hover {
    background-color: #f9fafb;
  }

  .button-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  /* Icons */
  .icon {
    width: 1rem;
    height: 1rem;
  }

  .icon-sm {
    width: 0.75rem;
    height: 0.75rem;
  }

  .footer-info {
    text-align: center;
    font-size: 0.875rem;
    color: #6b7280;
  }

  .footer-info p {
    margin-bottom: 0.25rem;
  }

  @media (max-width: 640px) {
    .container {
      padding: 0.5rem;
    }

    .content-wrapper {
      gap: 1rem;
    }

    .card-content {
      padding: 1rem;
    }

    .header h1 {
      font-size: 1.5rem;
    }

    .button-actions {
      flex-direction: column;
    }

    .password-section {
      margin-left: 0;
    }
  }
`;
