import { useState, useEffect } from 'react';
import React from 'react';
import { StyledGradeForm } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import { Empty, Form } from 'antd';
import { DatePicker } from 'ui';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Zap } from 'lucide-react';

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
    finalScore: number | null;
    finalGrade?: string; // Numerical annual grade
    divisions: {
      divisionId: string;
      average: number;
      adjusted: number;
      weighted: number;
      ratio?: number;
      grade?: string;
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
  const [teamData, setTeamData] = useState<ApiResponse | null>(null);
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const currentYear = dayjs().year();
  const [queryParams, setQueryParams] = useState({ year: currentYear });

  const { refetch: getEvaluations } = useQueryApiClient({
    request: {
      url: `api/evaluation/all-evaluation-by-year`,
      data: queryParams,
      method: 'GET',
      disableOnMount: true,
    },
    onSuccess(response) {
      setData(response.data);
    },
    onError() {
      setData(null);
    },
  });

  const { refetch: getTeamEvaluations } = useQueryApiClient({
    request: {
      url: `/api/evaluation/all-evaluation-by-year-team`,
      data: queryParams,
      method: 'GET',
      disableOnMount: true,
    },
    onSuccess(response) {
      setTeamData(response.data);
    },
    onError() {
      setTeamData(null);
    },
  });

  const getGrade = (student: ApiResponse['students'][0], evaluationId: string, period: number): string => {
    return student.grades[evaluationId]?.[period] || '-';
  };

  useEffect(() => {
    const initialValues: any = {
      year: dayjs(`${dayjs().year()}-01-01`),
    };
    initialValues.month = dayjs().month() + 1;

    form.setFieldsValue(initialValues);
  }, [form]);

  useEffect(() => {
    getEvaluations();
    getTeamEvaluations();
  }, [queryParams]);

  return (
    <StyledGradeForm>
      <Form
        form={form}
        layout="vertical"
        onValuesChange={() => setQueryParams({ year: dayjs(form.getFieldValue('year')).year() })}
        style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'space-between' }}
      >
        <DatePicker
          label={t('select_year')}
          picker="year"
          name="year"
          allowClear={false}
          disabledDate={(current) => current && current.year() > currentYear}
        />
        <h1 className="title-text" style={{ textAlign: 'center' }}>
          {t('yearly_team_member_evaluation')}
        </h1>
      </Form>
      {!!!data?.students ? (
        <Empty />
      ) : (
        <div className="grade-system">
          <div className="table-container">
            <table className="grade-table">
              <thead>
                <tr className="category-header">
                  <th rowSpan={3} className="student-info-header">
                    <div className="logo-section">
                      <div className="logo-container">
                        <div className="logo-icon">
                          <Zap className="logo-svg" />
                        </div>
                        <div className="logo-text">
                          <h2>KPI</h2>
                          <span>{t('evaluations')}</span>
                        </div>
                      </div>
                      <div className="logo-glow"></div>
                    </div>
                  </th>
                  {data?.evaluationPeriods?.map((period) => (
                    <th
                      key={period.id}
                      colSpan={period.periods.length}
                      className={`category-cell category-${period.id}`}
                    >
                      <div className="category-content">
                        <div className="category-name">{period.name}</div>
                        <div className="category-percentage">{period.percentage}%</div>
                      </div>
                    </th>
                  ))}
                  <th rowSpan={3} className="annual-header">
                    <div className="category-content">
                      <div className="category-name">{t('final_result')}</div>
                      <div className="category-percentage">100%</div>
                    </div>
                  </th>

                  {(() => {
                    const missingDiv = data?.students
                      .flatMap((student) => student.divisions)
                      .find((divs) => !data.evaluationPeriods?.some((div) => div.id === divs.divisionId));

                    return missingDiv ? (
                      <th rowSpan={3} className="annual-header">
                        <div className="category-content">
                          <div className="category-name mission-content">{t('joined_division')}</div>
                          <div className="category-percentage">{missingDiv.ratio}%</div>
                        </div>
                      </th>
                    ) : null;
                  })()}
                </tr>

                <tr className="period-header">
                  {data?.evaluationPeriods?.map((evaluation) =>
                    evaluation.periods.map((period) => (
                      <th key={`${evaluation.id}-${period}`} className={`period-cell category-${evaluation.id}`}>
                        {period}
                      </th>
                    ))
                  )}
                </tr>

                <tr className="avg-header">
                  {data?.evaluationPeriods?.map((evaluation, evaluationIndex) => {
                    const divisionColor = generateDivisionColor(evaluationIndex);

                    return evaluation?.periods?.map((period, index) => (
                      <th
                        key={`avg-${evaluation.id}-${period}`}
                        style={{
                          backgroundColor: index === 0 ? divisionColor.bg : '#f0f9ff',
                          color: index === 0 ? divisionColor.text : '#1e40af',
                        }}
                        className={`avg-cell category-${evaluation.id}`}
                      ></th>
                    ));
                  })}
                </tr>
              </thead>

              <tbody>
                {data.students.map((student) => (
                  <React.Fragment key={student.id}>
                    <tr className="student-row">
                      <td className="student-info-cell">
                        <div className="student-details">
                          <div className="student-main">
                            <span className="name">{student.name}</span>
                          </div>
                          <div className="student-secondary">
                            <span className="position">{t(student.position)}</span>
                            <span className="department">{student.department}</span>
                          </div>
                          <div className="student-extra">
                            <span className="date">{student.date}</span>
                          </div>
                        </div>
                      </td>

                      {data.evaluationPeriods.map((evaluation) =>
                        evaluation.periods.map((period) => {
                          const grade = getGrade(student, evaluation.id, period);
                          return (
                            <td
                              key={`${evaluation.id}-${period}`}
                              className={`grade-cell grade-${grade.toLowerCase().replace('+', '-plus')}`}
                              title={`${student.name} - ${evaluation.name} - Period ${period}: ${grade}`}
                            >
                              {grade}
                            </td>
                          );
                        })
                      )}
                      <td className="annual-cell">
                        <div className="annual-grade">{student.finalScore ?? '-'}</div>
                        <div className="annual-label final-grade">{student.finalGrade}</div>
                      </td>
                      {(() => {
                        const missingDiv = student.divisions.find(
                          (divs) => !data.evaluationPeriods?.some((div) => div.id === divs.divisionId)
                        );

                        return missingDiv ? (
                          <td className="annual-cell">
                            <div className="annual-grade">{missingDiv.weighted ?? '-'}</div>
                            <div className="annual-label final-grade">{missingDiv.grade}</div>
                          </td>
                        ) : null;
                      })()}
                    </tr>

                    <tr className="student-avg-row">
                      <td className="avg-label-cell">
                        <div className="avg-student-label">AVG</div>
                      </td>

                      {/* AVG values for each division - centered in middle of division */}
                      {data.evaluationPeriods.map((evaluation) => {
                        // Find the avg value for this division for this specific student
                        const avgValue =
                          student.divisions?.find((div) => div.divisionId === evaluation.id)?.average || 0;
                        const divisionLength = evaluation.periods.length;
                        const middleIndex = Math.floor(divisionLength / 2);

                        return evaluation.periods.map((period, index) => (
                          <td key={`student-avg-${student.id}-${evaluation.id}-${period}`} className="avg-period-cell">
                            {index === middleIndex ? (
                              <div className="avg-value-display">{avgValue}</div>
                            ) : (
                              <div className="avg-empty-cell"></div>
                            )}
                          </td>
                        ));
                      })}
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div>
        <h1 className="title-text" style={{ textAlign: 'end', margin: '40px 0' }}>
          {t('yearly_team_evaluation')}
        </h1>
      </div>
      {!!!teamData?.students ? (
        <Empty />
      ) : (
        <div className="grade-system">
          <div className="table-container">
            <table className="grade-table">
              <thead>
                <tr className="category-header">
                  <th rowSpan={3} className="student-info-header">
                    <div className="logo-section">
                      <div className="logo-container">
                        <div className="logo-icon">
                          <Zap className="logo-svg" />
                        </div>
                        <div className="logo-text">
                          <h2>KPI</h2>
                          <span>{t('evaluations')}</span>
                        </div>
                      </div>
                      <div className="logo-glow"></div>
                    </div>
                  </th>
                  {teamData?.evaluationPeriods?.map((period) => (
                    <th
                      key={period.id}
                      colSpan={period.periods.length}
                      className={`category-cell category-${period.id}`}
                    >
                      <div className="category-content">
                        <div className="category-name">{period.name}</div>
                        <div className="category-percentage">{period.percentage}%</div>
                      </div>
                    </th>
                  ))}
                  <th rowSpan={3} className="annual-header">
                    <div className="category-content">
                      <div className="category-name">{t('final_result')}</div>
                      <div className="category-percentage">100%</div>
                    </div>
                  </th>

                  {(() => {
                    const missingDiv = data?.students
                      .flatMap((student) => student.divisions)
                      .find((divs) => !data.evaluationPeriods?.some((div) => div.id === divs.divisionId));

                    return missingDiv ? (
                      <th rowSpan={3} className="annual-header">
                        <div className="category-content">
                          <div className="category-name mission-content">{t('joined_division')}</div>
                          <div className="category-percentage">{missingDiv.ratio}%</div>
                        </div>
                      </th>
                    ) : null;
                  })()}
                </tr>

                <tr className="period-header">
                  {teamData?.evaluationPeriods?.map((evaluation) =>
                    evaluation.periods.map((period) => (
                      <th key={`${evaluation.id}-${period}`} className={`period-cell category-${evaluation.id}`}>
                        {period}
                      </th>
                    ))
                  )}
                </tr>

                <tr className="avg-header">
                  {teamData?.evaluationPeriods?.map((evaluation, evaluationIndex) => {
                    const divisionColor = generateDivisionColor(evaluationIndex);

                    return evaluation?.periods?.map((period, index) => (
                      <th
                        key={`avg-${evaluation.id}-${period}`}
                        style={{
                          backgroundColor: index === 0 ? divisionColor.bg : '#f0f9ff',
                          color: index === 0 ? divisionColor.text : '#1e40af',
                        }}
                        className={`avg-cell category-${evaluation.id}`}
                      ></th>
                    ));
                  })}
                </tr>
              </thead>

              <tbody>
                {teamData.students.map((student) => (
                  <React.Fragment key={student.id}>
                    <tr className="student-row">
                      <td className="student-info-cell">
                        <div className="student-details">
                          <div className="student-main">
                            <span className="name">{student.name}</span>
                          </div>
                          <div className="student-secondary">
                            <span className="position">{t(student.position)}</span>
                            <span className="department">{student.department}</span>
                          </div>
                          <div className="student-extra">
                            <span className="date">{student.date}</span>
                          </div>
                        </div>
                      </td>

                      {teamData.evaluationPeriods.map((evaluation) =>
                        evaluation.periods.map((period) => {
                          const grade = getGrade(student, evaluation.id, period);
                          return (
                            <td
                              key={`${evaluation.id}-${period}`}
                              className={`grade-cell grade-${grade.toLowerCase().replace('+', '-plus')}`}
                              title={`${student.name} - ${evaluation.name} - Period ${period}: ${grade}`}
                            >
                              {grade}
                            </td>
                          );
                        })
                      )}
                      <td className="annual-cell">
                        <div className="annual-grade">{student.finalScore ?? '-'}</div>
                        <div className="annual-label final-grade">{student.finalGrade}</div>
                      </td>
                      {(() => {
                        const missingDiv = student.divisions.find(
                          (divs) => !teamData.evaluationPeriods?.some((div) => div.id === divs.divisionId)
                        );

                        return missingDiv ? (
                          <td className="annual-cell">
                            <div className="annual-grade">{missingDiv.weighted ?? '-'}</div>
                            <div className="annual-label final-grade">{missingDiv.grade}</div>
                          </td>
                        ) : null;
                      })()}
                    </tr>

                    <tr className="student-avg-row">
                      <td className="avg-label-cell">
                        <div className="avg-student-label">AVG</div>
                      </td>

                      {/* AVG values for each division - centered in middle of division */}
                      {teamData.evaluationPeriods.map((evaluation) => {
                        // Find the avg value for this division for this specific student
                        const avgValue =
                          student.divisions?.find((div) => div.divisionId === evaluation.id)?.average || 0;
                        const divisionLength = evaluation.periods.length;
                        const middleIndex = Math.floor(divisionLength / 2);

                        return evaluation.periods.map((period, index) => (
                          <td key={`student-avg-${student.id}-${evaluation.id}-${period}`} className="avg-period-cell">
                            {index === middleIndex ? (
                              <div className="avg-value-display">{avgValue}</div>
                            ) : (
                              <div className="avg-empty-cell"></div>
                            )}
                          </td>
                        ));
                      })}
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </StyledGradeForm>
  );
}
