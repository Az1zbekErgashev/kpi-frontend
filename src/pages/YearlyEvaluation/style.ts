import styled from 'styled-components';

export const StyledGradeForm = styled.div`
  .loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    gap: 12px;
  }

  .loading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid #e2e8f0;
    border-top: 3px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .error-container {
    text-align: center;
    padding: 40px;
    background: white;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    margin: 20px;
  }

  .error-container h3 {
    color: #dc2626;
    margin-bottom: 12px;
  }

  .error-container button {
    margin-top: 16px;
    padding: 8px 16px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  /* Main layout */
  .grade-system {
    padding: 20px 0; /* Adjusted padding */
    max-width: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* Info container (removed as per image, but keeping styles if needed elsewhere) */
  .info-container {
    display: none; /* Hidden as per image */
  }

  /* Table container */
  .table-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow-x: auto; /* Enables horizontal scrolling */
  }

  /* Main table */
  .grade-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    min-width: 1600px; /* Increased min-width to ensure scroll */
  }

  /* Table headers */
  .category-header th {
    background: #f8fafc; /* Light background for category headers */
    border: 1px solid #e2e8f0;
    padding: 12px 8px;
    text-align: center;
    font-weight: 600;
    font-size: 11px;
  }

  .student-info-header {
    background: #f1f5f9 !important;
    width: 200px;
    min-width: 200px;
  }

  .category-cell {
    position: relative;
  }

  /* Specific category background colors (adjusted to be more subtle like image) */
  .category-cell.category-basic_performance,
  .category-cell.category-division_1 {
    background: #f8fafc !important; /* Light grey */
  }

  .category-cell.category-performance_evaluation,
  .category-cell.category-division_2 {
    background: #f8fafc !important; /* Light grey */
  }

  .category-cell.category-attendance_check,
  .category-cell.category-division_3 {
    background: #f8fafc !important; /* Light grey */
  }

  .category-cell.category-training_participation,
  .category-cell.category-division_4 {
    background: #f8fafc !important; /* Light grey */
  }

  .category-cell.category-division_5 {
    background: #f8fafc !important; /* Light grey */
  }

  .category-cell.category-division_6 {
    background: #f8fafc !important; /* Light grey */
  }

  .category-cell.category-division_7 {
    background: #f8fafc !important; /* Light grey */
  }

  .category-cell.category-division_8 {
    background: #f8fafc !important; /* Light grey */
  }

  .category-cell.category-division_9 {
    background: #f8fafc !important; /* Light grey */
  }

  .category-cell.category-division_10 {
    background: #f8fafc !important; /* Light grey */
  }

  .category-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .category-name {
    font-weight: 700;
    font-size: 12px;
  }

  .category-percentage {
    background: #6b7280;
    color: white;
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 10px;
    align-self: center;
  }

  .category-description {
    font-size: 10px;
    color: #6b7280;
    font-weight: normal;
  }

  .annual-header {
    background: #fffbe6 !important; /* Yellowish background for annual grade */
    width: 100px;
    min-width: 100px;
  }

  /* Period header */
  .period-header th {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 8px 4px;
    text-align: center;
    font-weight: 600;
    font-size: 10px;
    width: 30px;
    min-width: 30px;
  }

  /* Period cell background colors (adjusted to be more subtle like image) */
  .period-cell.category-basic_performance,
  .period-cell.category-division_1 {
    background: white !important; /* White */
  }

  .period-cell.category-performance_evaluation,
  .period-cell.category-division_2 {
    background: white !important; /* White */
  }

  .period-cell.category-attendance_check,
  .period-cell.category-division_3 {
    background: white !important; /* White */
  }

  .period-cell.category-training_participation,
  .period-cell.category-division_4 {
    background: white !important; /* White */
  }

  .period-cell.category-division_5 {
    background: white !important; /* White */
  }

  .period-cell.category-division_6 {
    background: white !important; /* White */
  }

  .period-cell.category-division_7 {
    background: white !important; /* White */
  }

  .period-cell.category-division_8 {
    background: white !important; /* White */
  }

  .period-cell.category-division_9 {
    background: white !important; /* White */
  }

  .period-cell.category-division_10 {
    background: white !important; /* White */
  }

  /* Table body */
  .student-row {
    border-bottom: 1px solid #e2e8f0;
  }

  /* Student info cell */
  .student-info-cell {
    background: white;
    border: 1px solid #e2e8f0;
    padding: 12px;
    width: 200px;
    min-width: 200px;
    vertical-align: top;
  }

  .student-details {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .student-main {
    display: flex;
    gap: 8px;
    font-weight: 600;
  }

  .student-main .name {
    color: #2563eb;
  }

  .student-secondary {
    display: flex;
    gap: 8px;
    font-size: 11px;
    color: #6b7280;
  }

  .student-extra {
    display: flex;
    gap: 8px;
    font-size: 10px;
    color: #9ca3af;
  }

  /* Grade cells - NO HOVER EFFECTS */
  .grade-cell {
    border: 1px solid #e2e8f0;
    padding: 8px 4px;
    text-align: center;
    font-weight: 700;
    font-size: 12px;
    width: 30px;
    min-width: 30px;
    vertical-align: middle;
  }

  /* Grade colors */
  .grade-cell.grade-a,
  .annual-grade.grade-a,
  .grade-badge.grade-a {
    background: #ecfdf5;
    color: #059669;
    border-color: #a7f3d0;
  }

  .grade-cell.grade-b,
  .annual-grade.grade-b,
  .grade-badge.grade-b {
    background: #eff6ff;
    color: #2563eb;
    border-color: #93c5fd;
  }

  .grade-cell.grade-c,
  .annual-grade.grade-c,
  .grade-badge.grade-c {
    background: #fee2e2; /* Light red background */
    color: #b91c1c; /* Darker red text */
    border-color: #fca5a5; /* Medium red border */
  }

  .grade-cell.grade-d,
  .annual-grade.grade-d,
  .grade-badge.grade-d {
    background: #fef2f2;
    color: #dc2626;
    border-color: #fca5a5;
  }

  .grade-cell.grade-f,
  .annual-grade.grade-f,
  .grade-badge.grade-f {
    background: #fef2f2;
    color: #991b1b;
    border-color: #f87171;
  }

  .grade-cell.grade--,
  .annual-grade.grade--,
  .grade-badge.grade-- {
    background: #f9fafb;
    color: #9ca3af;
    border-color: #e5e7eb;
  }

  /* Annual grade cell */
  .annual-cell {
    background: #fffbe6; /* Yellowish background */
    border: 1px solid #e2e8f0;
    padding: 12px;
    text-align: center;
    width: 100px;
    min-width: 100px;
    vertical-align: middle;
  }

  .annual-grade {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .annual-label {
    font-size: 10px;
    color: #6b7280;
    font-weight: normal;
  }

  /* Average header row */
  .avg-header th {
    background: #f0f9ff;
    border: 1px solid #e2e8f0;
    padding: 6px 4px;
    text-align: center;
    font-weight: 600;
    font-size: 10px;
    color: #1e40af;
  }

  .avg-cell {
    font-weight: 700;
  }

  .avg-cell.category-basic_performance,
  .avg-cell.category-division_1 {
    background: #fef3c7 !important; /* Yellow */
    color: #92400e;
  }

  .avg-cell.category-performance_evaluation,
  .avg-cell.category-division_2 {
    background: #dbeafe !important; /* Blue */
    color: #1e40af;
  }

  .avg-cell.category-attendance_check,
  .avg-cell.category-division_3 {
    background: #f3e8ff !important; /* Purple */
    color: #7c3aed;
  }

  .avg-cell.category-training_participation,
  .avg-cell.category-division_4 {
    background: #dcfce7 !important; /* Green */
    color: #166534;
  }

  .avg-cell.category-division_5 {
    background: #fce7f3 !important; /* Pink */
    color: #be185d;
  }

  .avg-cell.category-division_6 {
    background: #ecfdf5 !important; /* Light Green */
    color: #059669;
  }

  .avg-cell.category-division_7 {
    background: #fef2f2 !important; /* Light Red */
    color: #dc2626;
  }

  .avg-cell.category-division_8 {
    background: #f0f9ff !important; /* Light Blue */
    color: #0369a1;
  }

  .avg-cell.category-division_9 {
    background: #fffbeb !important; /* Orange */
    color: #d97706;
  }

  .avg-cell.category-division_10 {
    background: #f5f3ff !important; /* Indigo */
    color: #6366f1;
  }

  .avg-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .avg-label {
    font-size: 8px;
    font-weight: 600;
    text-transform: uppercase;
  }

  .avg-value {
    font-size: 12px;
    font-weight: 700;
  }

  .avg-empty {
    height: 100%;
    min-height: 30px;
  }

  .avg-annual-cell {
    background: #f9fafb !important;
    color: #6b7280;
  }

  /* Statistics (removed as per image) */
  .statistics-container {
    display: none; /* Hidden as per image */
  }

  /* Legend (removed as per image) */
  .legend {
    display: none; /* Hidden as per image */
  }

  /* API Management (kept for completeness, though not directly used in this snippet) */
  .api-management {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }

  .api-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .card-header {
    padding: 16px 20px;
    border-bottom: 1px solid #e2e8f0;
  }

  .card-header h3 {
    font-size: 18px;
    font-weight: 600;
  }

  .card-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .action-button {
    padding: 12px 16px;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .action-button.primary {
    background: #3b82f6;
    color: white;
  }

  .action-button.primary:hover {
    background: #2563eb;
  }

  .action-button.secondary {
    background: #f8fafc;
    color: #374151;
    border: 1px solid #e2e8f0;
  }

  .action-button.secondary:hover {
    background: #f1f5f9;
  }

  .action-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .last-updated {
    text-align: center;
    font-size: 12px;
    color: #6b7280;
    background: #f8fafc;
    padding: 8px;
    border-radius: 4px;
  }

  .api-details {
    font-size: 14px;
    line-height: 1.6;
  }

  .api-details p {
    margin-bottom: 8px;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .grade-system {
      padding: 10px;
    }

    .table-container {
      overflow-x: auto; /* Ensure scroll on smaller screens */
    }
  }

  /* Custom Scrollbar Styles */
  /* For Webkit browsers (Chrome, Safari) */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #3b82f6; /* Blue color for the thumb */
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #2563eb; /* Darker blue on hover */
  }

  /* For Firefox (requires specific properties) */
  html {
    scrollbar-width: thin; /* "auto" or "thin" */
    scrollbar-color: #3b82f6 #f1f1f1; /* thumb color track color */
  }
`;
