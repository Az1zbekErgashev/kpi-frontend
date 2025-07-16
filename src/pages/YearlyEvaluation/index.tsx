import { useState, useEffect } from 'react';
import React from 'react';
import { StyledGradeForm } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';

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

const GRADE_POINTS = {
  A: 4.0,
  B: 3.0,
  C: 2.0,
  D: 1.0,
  F: 0.0,
};

export function GradeDisplay() {
  const { data: evaluationData } = useQueryApiClient({
    request: {
      url: '/api/evaluation/all-evaluation-by-year?year=2025',
    },
  });

  const calculateAnnualGrade = (
    student: ApiResponse['students'][0],
    evaluationPeriods: ApiResponse['evaluationPeriods']
  ): string => {
    let totalWeightedPoints = 0;
    let totalWeight = 0;

    evaluationPeriods.forEach((evaluation) => {
      const studentGrades = student.grades[evaluation.id];
      if (studentGrades) {
        const validGrades = Object.values(studentGrades).filter((grade): grade is string => grade !== null);

        if (validGrades.length > 0) {
          const totalPoints = validGrades.reduce(
            (sum, grade) => sum + (GRADE_POINTS[grade as keyof typeof GRADE_POINTS] || 0),
            0
          );
          const averagePoints = totalPoints / validGrades.length;

          const weight = evaluation.percentage / 100;
          totalWeightedPoints += averagePoints * weight;
          totalWeight += weight;
        }
      }
    });

    if (totalWeight === 0) return 'F';

    const finalPoints = totalWeightedPoints / totalWeight;

    // Convert back to letter grade
    if (finalPoints >= 3.5) return 'A';
    if (finalPoints >= 2.5) return 'B';
    if (finalPoints >= 1.5) return 'C';
    return 'F';
  };

  const getGrade = (student: ApiResponse['students'][0], evaluationId: string, period: number): string => {
    return student.grades[evaluationId]?.[period] || '-';
  };

  return (
    <StyledGradeForm>
      <div className="grade-system">
        <div className="table-container">
          <table className="grade-table">
            <thead>
              <tr className="category-header">
                <th rowSpan={2} className="student-info-header">
                  Student Information
                </th>
                {evaluationData?.data?.evaluationPeriods.map((period: any) => (
                  <th key={period.id} colSpan={period.periods.length} className={`category-cell category-${period.id}`}>
                    <div className="category-content">
                      <div className="category-name">{period.name}</div>
                      <div className="category-percentage">{period.percentage}%</div>
                      <div className="category-description">{period.description}</div>
                    </div>
                  </th>
                ))}
                <th rowSpan={2} className="annual-header">
                  Annual Grade
                </th>
              </tr>

              {/* Second header row - Period numbers */}
              <tr className="period-header">
                {evaluationData?.data?.evaluationPeriods.map(
                  (evaluation: any) =>
                    evaluation?.periods?.map((period: any) => (
                      <th key={`${evaluation.id}-${period}`} className={`period-cell category-${evaluation.id}`}>
                        {period}
                      </th>
                    ))
                )}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {evaluationData?.data?.students?.map((student: any) => {
                const annualGrade = calculateAnnualGrade(student, evaluationData?.data?.evaluationPeriods);
                return (
                  <tr key={student.id} className="student-row">
                    {/* Student Information */}
                    <td className="student-info-cell">
                      <div className="student-details">
                        <div className="student-main">
                          <span className="room">{student.room}</span>
                          <span className="class">{student.class}</span>
                          <span className="name">{student.name}</span>
                        </div>
                        <div className="student-secondary">
                          <span className="position">{student.position}</span>
                          <span className="department">{student.department}</span>
                        </div>
                        <div className="student-extra">
                          <span className="subject">{student.subject}</span>
                          <span className="date">{student.date}</span>
                        </div>
                      </div>
                    </td>

                    {evaluationData?.data?.evaluationPeriods?.map((evaluation: any) =>
                      evaluation.periods.map((period: any) => {
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

                    <td className="annual-cell">
                      <div className={`annual-grade grade-${annualGrade.toLowerCase()}`}>{annualGrade}</div>
                      <div className="annual-label">Final</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </StyledGradeForm>
  );
}
