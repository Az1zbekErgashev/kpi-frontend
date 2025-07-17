import { Card, Form } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CommentHistory, GoalCommentForCEO } from 'components';
import { StyledCommentHistory } from 'components/CommentHistory/style';
import { StyledGoalCommentForCEO } from 'components/GoalCommentForCEO/style';
import { StyledGoalTable } from 'components/GoalTable/style';
import dayjs from 'dayjs';
import { StyledGradeForm } from 'pages/YearlyEvaluation/style';
import React from 'react';
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

export function MonthlyTarget() {
  const params = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const newDateTime = new Date().getFullYear().toString();
  const [form] = Form.useForm();

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

  const year = new Date().getFullYear().toString();

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

  const getGrade = (student: ApiResponse['students'][0], evaluationId: string, period: number): string => {
    return student.grades[evaluationId]?.[period] || '-';
  };

  const handleFinish = (status: boolean) => {
    changeTargetStatus({
      status: status,
      comment: form.getFieldValue('comment'),
      goalId: targets?.data?.id,
    });
  };

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
          <br />
          <br />
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
                    const { type, valueRatio, valueRatioStatus, valueNumber, valueText, evaluationText, status, id } =
                      item.targetValue || {};
                    const currentTarget = targets?.data?.monthlyTargetValue?.find((t: any) => t.targetValueId === id);

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
                <thead>
                  <tr className="category-header">
                    <th rowSpan={2} className="student-info-header">
                      Student Information
                    </th>
                    {evaluationData?.data?.evaluationPeriods.map((period: any) => (
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
                  <Button onClick={() => handleFinish(false)} label={t('reject_for_correct')} type="primary" danger />
                </div>
              </Card>
            </Form>
          </StyledGoalCommentForCEO>
        )}
      </div>
    </StyledGoalTable>
  );
}
