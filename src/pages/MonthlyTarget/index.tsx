import { Card, Form } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CommentHistory, GoalCommentForCEO } from 'components';
import { StyledCommentHistory } from 'components/CommentHistory/style';
import { StyledGoalCommentForCEO } from 'components/GoalCommentForCEO/style';
import { StyledGoalTable } from 'components/GoalTable/style';
import dayjs from 'dayjs';
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

export function MonthlyTarget() {
  const params = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const newDateTime = new Date().getFullYear().toString();
  const [form] = Form.useForm();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const { data: evaluationData } = useQueryApiClient({
    request: {
      url: '/api/evaluation/all-evaluation-by-team',
      method: 'GET',
      data: { year: params.year, team: params.id },
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
      render: (createdAt, _) => dayjs(createdAt).format('YYYY.MM.DD HH:MM'),
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
    <StyledGoalTable>
      <BackButton label={t('back')} onClick={() => navigate(-1)} color="black" />
      <br />
      <div className="kpi-table-container">
        <div className="table-wrapper">
          <table className="kpi-table">
            <thead>
              <tr className="header-row">
                <th
                  colSpan={4}
                  className="main-header"
                  dangerouslySetInnerHTML={{
                    __html: t('goal_table_header_ceo_title')
                      .replace('{year}', params.year?.toString() ?? newDateTime)
                      .replace('{room}', rommAndTeam?.data?.room || '')
                      .replace('{team}', rommAndTeam?.data?.team || ''),
                  }}
                ></th>
              </tr>

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
                        type === 'IndividualEvaluation' ? t('[individual_evaluation]') : t('[leader_evaluation]');
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
            <div className="table-wrapper">
              <table className="kpi-table">
                <thead>
                  <tr className="header-row">
                    <th
                      colSpan={4}
                      className="main-header"
                      dangerouslySetInnerHTML={{
                        __html: t('goal_table_header_ceo_title')
                          .replace('{year}', params.year?.toString() ?? newDateTime)
                          .replace('{room}', rommAndTeam?.data?.room || '')
                          .replace('{team}', rommAndTeam?.data?.team || ''),
                      }}
                    ></th>
                  </tr>
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
                                      ? t('[individual_evaluation]')
                                      : t('[leader_evaluation]')}
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
                          <th
                            key={period.id}
                            colSpan={period.periods.length}
                            className={`category-cell category-${period.id}`}
                          >
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
