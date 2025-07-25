import { useState, useEffect } from 'react';
import React from 'react';
import { StyledGradeForm } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useParams } from 'react-router-dom';

interface ApiResponse {
  students: {
    id: string;
    room: string;
    class: string;
    name: string;
    position: string;
    department: string;
    type: string;
    subject: string;
    date: string;
    grades: {
      [evaluationId: string]: {
        [period: number]: string | null;
      };
    };
    finalScore: number | null; // Numerical annual grade
    divisions: {
      divisionId: string;
      average: number;
      adjusted: number;
      weighted: number;
    }[];
  }[];
  evaluationPeriods: {
    id: string;
    name: string;
    percentage: number;
    periods: number[];
    description: string;
  }[];
  statistics: {
    totalStudents: number;
    gradeDistribution: Record<string, number>;
  };
}

const generateDivisionColor = (index: number) => {
  const colors = [
    { bg: '#fef3c7', text: '#92400e' }, // Yellow
    { bg: '#dbeafe', text: '#1e40af' }, // Blue
    { bg: '#f3e8ff', text: '#7c3aed' }, // Purple
    { bg: '#dcfce7', text: '#166534' }, // Green
    { bg: '#fce7f3', text: '#be185d' }, // Pink
    { bg: '#ecfdf5', text: '#059669' }, // Light Green
    { bg: '#fef2f2', text: '#dc2626' }, // Light Red
    { bg: '#f0f9ff', text: '#0369a1' }, // Light Blue
    { bg: '#fffbeb', text: '#d97706' }, // Orange
    { bg: '#f5f3ff', text: '#6366f1' }, // Indigo
  ];

  return colors[index % colors.length];
};

export function GradeDisplay() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();

  const {} = useQueryApiClient({
    request: {
      url: `api/evaluation/all-evaluation-by-year?year=2025`,
    },
    onSuccess(response) {
      setData(response.data);
    },
    onError() {
      setError('Failed to fetch data');
    },
    onFinally() {
      setLoading(false);
    },
  });

  const getGrade = (student: ApiResponse['students'][0], evaluationId: string, period: number): string => {
    return student.grades[evaluationId]?.[period] || '-';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <span>Loading grade data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error Loading Data</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!data) {
    return <div className="error-container">No data available</div>;
  }

  return (
    <StyledGradeForm>
      <div className="grade-system">
        <div className="table-container">
          <table className="grade-table">
            {/* Table Header */}
            <thead>
              {/* First header row - Evaluation categories */}
              <tr className="category-header">
                <th rowSpan={3} className="student-info-header">
                  Student Information
                </th>
                {data?.evaluationPeriods?.map((period) => (
                  <th key={period.id} colSpan={period.periods.length} className={`category-cell category-${period.id}`}>
                    <div className="category-content">
                      <div className="category-name">{period.name}</div>
                      <div className="category-percentage">{period.percentage}%</div>
                      <div className="category-description">{period.description}</div>
                    </div>
                  </th>
                ))}
                <th rowSpan={3} className="annual-header">
                  Annual Grade
                </th>
              </tr>

              {/* Second header row - Period numbers */}
              <tr className="period-header">
                {data?.evaluationPeriods?.map((evaluation) =>
                  evaluation.periods.map((period) => (
                    <th key={`${evaluation.id}-${period}`} className={`period-cell category-${evaluation.id}`}>
                      {period}
                    </th>
                  ))
                )}
              </tr>

              {/* Third header row - Average values (only at the beginning of each division) */}
              <tr className="avg-header">
                {data?.evaluationPeriods?.map((evaluation, evaluationIndex) => {
                  const divisionColor = generateDivisionColor(evaluationIndex);
                  const avgValue =
                    data?.students[0]?.divisions?.find((div) => div.divisionId === evaluation.id)?.average || 0;

                  return evaluation?.periods?.map((period, index) => (
                    <th
                      key={`avg-${evaluation.id}-${period}`}
                      style={{
                        backgroundColor: index === 0 ? divisionColor.bg : '#f0f9ff',
                        color: index === 0 ? divisionColor.text : '#1e40af',
                      }}
                      className={`avg-cell category-${evaluation.id}`}
                    >
                      {index === 0 ? (
                        <div className="avg-content">
                          <div className="avg-label">AVG</div>
                          <div className="avg-value">{avgValue}</div>
                        </div>
                      ) : (
                        <div className="avg-empty"></div>
                      )}
                    </th>
                  ));
                })}
                <th className="avg-annual-cell">-</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data?.students?.map((student) => (
                <React.Fragment key={student.id}>
                  <tr className="student-row">
                    {/* Student Information */}
                    <td className="student-info-cell">
                      <div className="student-details">
                        <div className="student-main">
                          <span className="room">{student.room}</span>
                          <span className="name">{student.name}</span>
                        </div>
                        <div className="student-secondary">
                          <span className="position">{student.position}</span>
                          <span className="department">{student.department}</span>
                        </div>
                        <div className="student-extra">
                          <span className="date">{student.date}</span>
                        </div>
                      </div>
                    </td>

                    {/* Grade cells for each evaluation period */}
                    {data?.evaluationPeriods?.map(
                      (evaluation) =>
                        evaluation?.periods?.map((period) => {
                          const grade = getGrade(student, evaluation.id, period);
                          return (
                            <td
                              key={`${evaluation.id}-${period}`}
                              className={`grade-cell grade-${grade.toLowerCase()} category-${evaluation.id}`}
                              title={`${student.name} - ${evaluation.name} - Period ${period}: ${grade}`}
                            >
                              {grade}
                            </td>
                          );
                        })
                    )}

                    {/* Annual Grade */}
                    <td className="annual-cell">
                      <div className="annual-grade">{student.finalScore ?? '-'}</div>
                      <div className="annual-label">Final</div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StyledGradeForm>
  );
}
