import { StyledGoalTable } from 'components/GoalTable/style';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';

export function MonthlyTarget() {
  const params = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const newDateTime = new Date().getFullYear().toString();

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
      </div>
    </StyledGoalTable>
  );
}
