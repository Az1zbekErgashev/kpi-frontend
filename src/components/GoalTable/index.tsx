import React from 'react';
import { StyledGoalTable } from './style';
import { useTranslation } from 'react-i18next';
import { ApiData } from 'types/User';
import { useParams, useSearchParams } from 'react-router-dom';
import { useUser } from 'hooks/useUserState';

interface props {
  goal: ApiData | null;
}
export function GoalTable({ goal }: props) {
  const { t } = useTranslation();
  const params = useParams();
  const year = params.year ?? '';
  const { user } = useUser();
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
                {user?.Id == goal?.createdById && <th className="target-header">{t('target_value')}</th>}
              </tr>
            </thead>
            <tbody>
              {goal?.divisions?.map(
                (division, divisionIndex) =>
                  division?.goals?.map((item, goalIndex) => (
                    <tr key={`${division.id}-${goal.id}`} className={divisionIndex % 2 === 0 ? 'even-row' : 'odd-row'}>
                      {goalIndex === 0 && (
                        <>
                          <td className="category-cell" rowSpan={division.goals.length}>
                            {division.name}
                          </td>
                          <td className="ratio-cell" rowSpan={division.goals.length}>
                            {division.percentage}
                          </td>
                        </>
                      )}
                      <td className="content-cell">
                        <div className="goal-content">
                          <span className="checkmark">✓</span>
                          <span className="goal-text">{item.goalContent}</span>
                        </div>
                      </td>
                      {user?.Id == goal?.createdById && (
                        <td className="target-cell">
                          <div className="target-content">
                            <div className="target-text">{item?.targetValue?.valueText}</div>
                            {item?.targetValue?.evaluationText && (
                              <div className="evaluation-text">{item?.targetValue?.evaluationText}</div>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </StyledGoalTable>
  );
}
