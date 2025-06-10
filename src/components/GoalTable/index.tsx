import React from 'react';
import { StyledGoalTable } from './style';
import { useTranslation } from 'react-i18next';
import { ApiData } from 'types/User';
import { useParams } from 'react-router-dom';

interface props {
  goal: ApiData | null;
  roleType: 'CEO' | 'TEAM_LEADER' | 'TEAM_MEMBER';
}
export function GoalTable({ goal, roleType }: props) {
  const { t } = useTranslation();
  const params = useParams();
  const year = params.year ?? '';

  return (
    <StyledGoalTable>
      <div className="kpi-table-container">
        <div className="table-wrapper">
          <table className="kpi-table">
            <thead>
              <tr className="header-row">
                <th
                  colSpan={4}
                  className="main-header"
                  dangerouslySetInnerHTML={{
                    __html: t('goal_table_header_title')
                      .replace('{year}', year.toString())
                      .replace('{team}', goal?.createdBy?.room || ''),
                  }}
                ></th>
              </tr>
              <tr className="sub-header-row">
                <th colSpan={2} className="empty-header"></th>
                <th
                  colSpan={2}
                  className="year-header"
                  dangerouslySetInnerHTML={{
                    __html: t('goal_table_header').replace('{year}', year.toString()),
                  }}
                ></th>
              </tr>
              <tr className="column-headers">
                <th className="category-header">{t('division')}</th>
                <th className="ratio-header">{t('ratio')}</th>
                <th className="content-header">{t('goal_content')}</th>
                {roleType != 'CEO' && <th className="target-header">{t('target_value')}</th>}
              </tr>
            </thead>
            <tbody>
              {goal?.divisions?.map(
                (division, divisionIndex) =>
                  division?.goals?.map((item, goalIndex) => {
                    const { type, valueRatio, valueNumber, valueText, evaluationText, status } = item.targetValue || {};
                    let displayValue: string | null = null;
                    if (type === 'RatioType') {
                      displayValue = valueText
                        ? `${valueText} : ${valueRatio ?? 0}% ${status}`
                        : `${valueRatio ?? 0}% ${status}`;
                    } else if (type === 'NumberType') {
                      displayValue = valueText
                        ? `${valueText} : ${valueNumber ?? 0} ${status}`
                        : `${valueNumber ?? 0} ${status}`;
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
                        {roleType !== 'CEO' && (
                          <td className="target-cell">
                            <div className="target-content">
                              <div className="target-text">{displayValue}</div>
                            </div>
                          </td>
                        )}
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
