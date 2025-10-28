import { Card, Empty, Form } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CommentHistory, GoalCommentForCEO } from 'components';
import { StyledCommentHistory } from 'components/CommentHistory/style';
import { StyledGoalCommentForCEO } from 'components/GoalCommentForCEO/style';
import { StyledGoalTable } from 'components/GoalTable/style';
import dayjs from 'dayjs';
import { Zap } from 'lucide-react';
import { StyledGradeForm } from 'pages/YearlyEvaluation/style';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton, Button, Table, TextArea } from 'ui';
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

export function MonthlyTarget() {
  const params = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [teamData, setTeamData] = useState<ApiResponse | null>(null);

  const { data: targets } = useQueryApiClient({
    request: {
      url: '/api/monthlytarget/get-team-leader-target',
      data: { teamId: params.id, month: params.month, year: params.year },
    },
  });
  const { data: rommAndTeam } = useQueryApiClient({
    request: {
      url: `/api/goal/team-by-id?id=${params.id}`,
      method: 'GET',
    },
    onError(error) {
      if (error.error == 'team_not_found') navigate('/');
    },
  });

  const {} = useQueryApiClient({
    request: {
      url: '/api/evaluation/all-evaluation-by-team',
      method: 'GET',
      data: { year: params.year, team: params.id },
    },
    onSuccess(response) {
      setData(response.data);
    },
    onError() {
      setData(null);
    },
  });
  const {} = useQueryApiClient({
    request: {
      url: '/api/evaluation/all-evaluation-by-check-team',
      method: 'GET',
      data: { year: params.year, team: params.id },
    },
    onSuccess(response) {
      setTeamData(response.data);
    },
    onError() {
      setTeamData(null);
    },
  });

  const { appendData: changeTargetStatus } = useQueryApiClient({
    request: {
      url: '/api/monthlytarget/change-status',
      method: 'PUT',
    },
    onSuccess() {
      navigate(-1);
    },
  });

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PendingReview':
        return {
          background: '#FFF8E1',
          color: '#FFB300', // amber text (Material amber 600)
        };
      case 'Returned':
        return {
          background: '#FDECEA', // soft red background
          color: '#E53935', // bright red text (Material red 600)
        };
      case 'Approved':
        return {
          background: '#E8F5E9', // soft green background
          color: '#43A047', // green text (Material green 600)
        };
      default:
        return {
          background: '#E3F2FD', // soft blue
          color: '#1976D2', // blue text
        };
    }
  };

  const columns: ColumnsType = [
    { dataIndex: 'no', key: 'no', title: t('no'), render: (type, record, index) => index + 1 },
    { dataIndex: 'content', key: 'content', title: t('comment') },
    {
      dataIndex: 'status',
      key: 'status',
      title: t('status'),
      render: (status, _) => (
        <div className="status-wrapp">
          <div
            className="status"
            style={{ background: getStatusText(status).background, color: getStatusText(status).color }}
          >
            {t(status)}
          </div>
        </div>
      ),
    },
    {
      dataIndex: 'createdAt',
      key: 'createdAt',
      title: t('createdAt'),
    },
  ];

  const handleFinish = (status: boolean) => {
    changeTargetStatus({
      status: status,
      comment: form.getFieldValue('comment'),
      goalId: targets?.data?.id,
    });
  };

  const getGrade = (student: ApiResponse['students'][0], evaluationId: string, period: number): string => {
    return student.grades[evaluationId]?.[period] || '-';
  };

  return (
    <StyledGoalTable>
      <BackButton label={t('back')} onClick={() => navigate(-1)} color="black" />
      <br />
      <div className="styled_header">
        <h1 className="title">
          {t('performance_page_title_with_room')
            .replace('{year}', params.year ?? '')
            .replace('{team}', rommAndTeam?.data?.team ?? '')}
        </h1>
      </div>

      <div className="kpi-table-container">
        <div className="table-wrapper">
          <table className="kpi-table">
            <thead>
              <tr className="column-headers">
                <th className="category-header">{t('division')}</th>
                <th className="ratio-header">{t('ratio')}</th>
                <th className="content-header">{t('goal_content')}</th>
                <th className="target-header">{t('target_value')}</th>
              </tr>
            </thead>
            <tbody>
              {targets?.data?.goal?.divisions?.map(
                (division: any, divisionIndex: number) =>
                  division?.goals?.map((item: any, goalIndex: number) => {
                    const { type, valueRatio, valueNumber, valueText, evaluationText, status } = item.targetValue || {};
                    let displayValue: string | null = null;
                    if (type === 'RatioType') {
                      displayValue = valueText
                        ? `${valueText} : ${valueRatio ?? 0}% ${t(status)}`
                        : `${valueRatio ?? 0}% ${t(status)}`;
                    } else if (type === 'NumberOfTimesType') {
                      displayValue = valueText
                        ? `${valueText} : ${valueNumber ?? 0}% ${t(status)}`
                        : `${valueNumber ?? 0}% ${t(status)}`;
                    } else if (type === 'IndividualEvaluation' || type === 'LeaderEvaluation') {
                      const label =
                        type === 'IndividualEvaluation' ? t('[개인평가]') : t('[리더평가]');
                      displayValue = evaluationText ? `${evaluationText} ${label}` : label;
                    } else if (type === 'TextType') {
                      displayValue = t('text_type');
                    }

                    return (
                      <tr
                        key={`${division.id}-${goalIndex}`}
                        className={divisionIndex % 2 === 0 ? 'even-row' : 'odd-row'}
                      >
                        {goalIndex === 0 && (
                          <>
                            <td className="category-cell" rowSpan={division.goals.length}>
                              {division.name}
                            </td>
                            <td className="ratio-cell" rowSpan={division.goals.length}>
                              {division.ratio}
                            </td>
                          </>
                        )}
                        <td className="content-cell">
                          <div className="goal-content">
                            <span className="checkmark">✓</span>
                            <span className="goal-text">{item.goalContent}</span>
                          </div>
                        </td>
                        <td className="target-cell">
                          <div className="target-content">
                            <div className="target-text">{displayValue}</div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
              )}
            </tbody>
          </table>
        </div>
        <br />
        <br />
        {targets?.data?.status !== 'NoWritte' && (
          <>
            <div className="styled_header">
              <h1 className="title">
                {t('performance_page_title_with_room_month')
                  .replace('{year}', params.year ?? '')
                  .replace('{month}', params.month ?? '')
                  .replace('{team}', rommAndTeam?.data?.team ?? '')}
              </h1>
            </div>
            <div className="table-wrapper">
              <table className="kpi-table">
                <thead>
                  <tr className="column-headers">
                    <th className="category-header">{t('division')}</th>
                    <th className="content-header">{t('goal_content')}</th>
                    <th className="target-header">{t('target_value')}</th>
                  </tr>
                </thead>
                <tbody>
                  {targets?.data?.goal?.divisions?.map(
                    (division: any, divisionIndex: number) =>
                      division?.goals?.map((item: any, goalIndex: number) => {
                        const {
                          type,
                          valueRatio,
                          valueRatioStatus,
                          valueNumber,
                          valueText,
                          evaluationText,
                          status,
                          id,
                        } = item.targetValue || {};
                        const currentTarget = targets?.data?.monthlyTargetValue?.find(
                          (t: any) => t.targetValueId === id
                        );

                        return (
                          <tr
                            key={`${division.id}-${goalIndex}`}
                            className={divisionIndex % 2 === 0 ? 'even-row' : 'odd-row'}
                          >
                            {goalIndex === 0 && (
                              <td className="category-cell" rowSpan={division.goals.length}>
                                {division.name}
                              </td>
                            )}
                            <td className="content-cell">
                              <div className="goal-content">
                                <span className="checkmark">✓</span>
                                <span className="goal-text">{item.goalContent}</span>
                              </div>
                            </td>
                            <td className="target-cell">
                              <div className="target-text">
                                {type === 'RatioType' && (
                                  <>
                                    {valueText ? `${valueText}: ` : ''}
                                    {currentTarget?.valueRatio ?? valueRatio ?? 0}/
                                    {currentTarget?.valueRatioStatus ?? valueRatioStatus ?? 0}
                                    {status ? ` ${t(status)}` : ''}
                                  </>
                                )}
                                {type === 'NumberOfTimesType' && (
                                  <>
                                    {valueText ? `${valueText}: ` : ''}
                                    {currentTarget?.valueNumber ?? valueNumber ?? 0}
                                    {status ? ` ${t(status)}` : ''}
                                  </>
                                )}
                                {type === 'TextType' && <>{currentTarget?.valueText ?? valueText ?? ''}</>}
                                {(type === 'IndividualEvaluation' || type === 'LeaderEvaluation') && (
                                  <>
                                    {type === 'IndividualEvaluation'
                                      ? t('[개인평가]')
                                      : t('[리더평가]')}
                                    {evaluationText ? ` ${evaluationText}` : ''}
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
            </div>
            <br />
            {!!!data?.students ? (
              <Empty />
            ) : (
              <StyledGradeForm>
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
                              <th
                                key={`${evaluation.id}-${period}`}
                                className={`period-cell category-${evaluation.id}`}
                              >
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
                            {/* Student grades row */}
                            <tr className="student-row">
                              {/* Student Information */}
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
                                  <td
                                    key={`student-avg-${student.id}-${evaluation.id}-${period}`}
                                    className="avg-period-cell"
                                  >
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
              </StyledGradeForm>
            )}
            <h1 className="title-text" style={{ textAlign: 'end', margin: '40px 0' }}>
              {t('yearly_team_evaluation')}
            </h1>
            {!!!teamData?.students ? (
              <Empty />
            ) : (
              <StyledGradeForm>
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
                            const missingDiv = teamData?.students
                              .flatMap((student) => student.divisions)
                              .find((divs) => !teamData.evaluationPeriods?.some((div) => div.id === divs.divisionId));

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
                              <th
                                key={`${evaluation.id}-${period}`}
                                className={`period-cell category-${evaluation.id}`}
                              >
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
                            {/* Student grades row */}
                            <tr className="student-row">
                              {/* Student Information */}
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
                                  <td
                                    key={`student-avg-${student.id}-${evaluation.id}-${period}`}
                                    className="avg-period-cell"
                                  >
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
              </StyledGradeForm>
            )}
            <br />
            <br />
            <StyledCommentHistory>
              {targets?.data?.monthlyTargetComment && (
                <Table columns={columns} dataSource={targets?.data?.monthlyTargetComment ?? []} />
              )}
            </StyledCommentHistory>
            {targets?.data?.status == 'PendingReview' && (
              <StyledGoalCommentForCEO>
                <Form form={form} layout="vertical">
                  <Card className="comment-card">
                    <TextArea name="comment" rows={4} placeholder={t('add_comment_area')} />
                    <div className="flex-button">
                      <Button onClick={() => handleFinish(true)} label={t('approve')} type="primary" />
                      <Button
                        onClick={() => handleFinish(false)}
                        label={t('reject_for_correct')}
                        type="primary"
                        danger
                      />
                    </div>
                  </Card>
                </Form>
              </StyledGoalCommentForCEO>
            )}
          </>
        )}
      </div>
    </StyledGoalTable>
  );
}
