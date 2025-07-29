import styled from 'styled-components';

export const StyledGradeForm = styled.div`
  .grade-system {
    padding: 20px 0;
    max-width: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* Table container */
  .table-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow-x: auto;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  /* Main table */
  .grade-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    min-width: 1600px;
    margin-bottom: 0;
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
  }

  .category-cell {
    position: relative;
    background: #f8fafc !important;
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
    background: #fffbe6 !important;
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

  .period-cell {
    background: white !important;
  }

  /* Table body */
  .student-row {
    border-bottom: 1px solid #e2e8f0;
  }

  /* Student AVG row */
  .student-avg-row {
    border-bottom: 2px solid #d1d5db;
    background: #e0f2fe;
  }

  /* AVG label cell for students */
  .avg-label-cell {
    background: #e0f2fe;
    border: 1px solid #e2e8f0;
    padding: 8px;
    width: 200px;
    min-width: 200px;
    text-align: center;
    vertical-align: middle;
  }

  .avg-student-label {
    font-weight: 700;
    font-size: 11px;
    color: #0c4a6e;
  }

  /* AVG period cells */
  .avg-period-cell {
    background: #e0f2fe;
    padding: 6px 4px;
    text-align: center;
    font-weight: 600;
    font-size: 10px;
    width: 30px;
    min-width: 30px;
    vertical-align: middle;
  }

  /* AVG value display */
  .avg-value-display {
    background: #fbbf24;
    color: #92400e;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: 700;
    font-size: 11px;
    border: 1px solid #d97706;
  }

  /* Empty AVG cells */
  .avg-empty-cell {
    height: 100%;
    min-height: 24px;
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
  .annual-grade.grade-a {
    background: #ecfdf5;
    color: #059669;
    border-color: #a7f3d0;
  }

  .grade-cell.grade-b,
  .annual-grade.grade-b {
    background: #eff6ff;
    color: #2563eb;
    border-color: #93c5fd;
  }

  .grade-cell.grade-c,
  .annual-grade.grade-c {
    background: #fee2e2;
    color: #b91c1c;
    border-color: #fca5a5;
  }

  .grade-cell.grade-d,
  .annual-grade.grade-d {
    background: #fef2f2;
    color: #dc2626;
    border-color: #fca5a5;
  }

  .grade-cell.grade-f,
  .annual-grade.grade-f {
    background: #fef2f2;
    color: #991b1b;
    border-color: #f87171;
  }

  .grade-cell.grade--,
  .annual-grade.grade-- {
    background: #f9fafb;
    color: #9ca3af;
    border-color: #e5e7eb;
  }

  /* Annual grade cell */
  .annual-cell {
    background: #fffbe6;
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

  /* Responsive design */
  @media (max-width: 768px) {
    .grade-system {
      padding: 10px;
    }

    .table-container {
      overflow-x: auto;
    }
  }

  /* Custom Scrollbar Styles */
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
    background: #2563eb;
  }

  html {
    scrollbar-width: thin;
    scrollbar-color: #3b82f6 #f1f1f1;
  }

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
    background: linear-gradient(135deg, rgba(74, 149, 255, 0.95) 0%, rgba(58, 123, 213, 0.95) 100%);
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
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%);
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
    color: #ffffffff;
    filter: drop-shadow(0 2px 8px rgba(58, 123, 213, 0.4));
    z-index: 1;
    position: relative;
  }

  .logo-text h2 {
    margin: 0;
    font-size: 26px;
    font-weight: 800;
    color: rgba(58, 123, 213, 0.95);
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    letter-spacing: -0.5px;
  }

  .logo-text span {
    font-size: 13px;
    color: rgba(58, 123, 213, 0.95);
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
`;
