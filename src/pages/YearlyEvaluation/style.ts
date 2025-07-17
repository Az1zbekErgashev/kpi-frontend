import styled from 'styled-components';

export const StyledGradeForm = styled.div`
  .grade-system {
    margin-top: 30px;
    max-width: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* Info container */
  .info-container {
    display: flex;
    justify-content: center;
  }

  .info-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    width: 100%;
  }

  .card-header {
    padding: 16px 20px;
    border-bottom: 1px solid #e2e8f0;
  }

  .card-header h3 {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }

  .card-content {
    padding: 20px;
  }

  .calculation-info h4 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #374151;
  }

  .calculation-steps {
    font-size: 14px;
    line-height: 1.6;
  }

  .calculation-steps p {
    margin-bottom: 8px;
  }

  .calculation-steps ul {
    margin: 8px 0 8px 20px;
  }

  .calculation-steps li {
    margin-bottom: 4px;
  }

  /* Table container */
  .table-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow-x: auto; /* This enables horizontal scrolling */
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
    background: #f8fafc;
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
    margin-top: 100px;
  }

  .category-cell {
    position: relative;
  }

  .category-cell.category-basic_performance {
    /* background: #fce7f3 !important; */
  }

  .category-cell.category-performance_evaluation {
    background: #dbeafe !important;
  }

  .category-cell.category-attendance_check {
    background: #bfdbfe !important;
  }

  .category-cell.category-training_participation {
    background: #dcfce7 !important;
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
    background: #fef3c7 !important;
    width: 100px;
    min-width: 100px;
    background-color: green;
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

  .period-cell.category-basic_performance {
    background: #fce7f3 !important;
    padding: 8px;
  }

  .period-cell.category-performance_evaluation {
    background: #dbeafe !important;
    padding: 8px;
  }

  .period-cell.category-attendance_check {
    background: #bfdbfe !important;
    padding: 8px;
  }

  .period-cell.category-training_participation {
    background: #dcfce7 !important;
    padding: 8px;
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
    background: #fef3c7;
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

  /* Statistics */
  .statistics-container {
    display: flex;
    gap: 20px;
  }

  .stats-card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    flex: 1;
  }

  .stats-card h3 {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 600;
  }

  .stats-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .total-students {
    text-align: center;
  }

  .stats-number {
    display: block;
    font-size: 32px;
    font-weight: 700;
    color: #3b82f6;
  }

  .stats-label {
    font-size: 14px;
    color: #6b7280;
  }

  .grade-distribution h4 {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .distribution-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .grade-badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 12px;
    border: 1px solid;
  }

  .count {
    font-size: 12px;
    color: #6b7280;
  }

  /* Legend */
  .legend {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .legend-content {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    font-size: 14px;
  }

  .legend-title {
    font-weight: 600;
    margin-right: 10px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .legend-color {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 1px solid #e2e8f0;
  }

  .legend-color.grade-a {
    background: #ecfdf5;
    border-color: #a7f3d0;
  }
  .legend-color.grade-b {
    background: #eff6ff;
    border-color: #93c5fd;
  }
  .legend-color.grade-c {
    background: #fee2e2;
    border-color: #fca5a5;
  }
  .legend-color.grade-d {
    background: #fef2f2;
    border-color: #fca5a5;
  }
  .legend-color.grade-f {
    background: #fef2f2;
    border-color: #f87171;
  }
  .legend-color.grade-- {
    background: #f9fafb;
    border-color: #e5e7eb;
  }

  /* API Management */
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

    .legend-content {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }

    .statistics-container {
      flex-direction: column;
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
    background: #3b82f6;
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
