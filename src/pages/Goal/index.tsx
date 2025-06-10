import React from 'react';
import { StyledGoalPage } from './style';
import { CommentHistory, GoalForm, GoalTable } from 'components';
import { useGoal } from 'hooks/useGoal';
import { useUser } from 'hooks/useUserState';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

export function GoalPage() {
  const goalHook = useGoal();
  const { user } = useUser();
  const { t } = useTranslation();

  const year = new Date().getFullYear().toString();

  return (
    <StyledGoalPage>
      <div className="styled_header">
        <h1 className="title">
          {t('goal_page_title_with_room')
            .replace(
              '{year}',
              goalHook.goalByUserId?.data?.createdAt
                ? dayjs(goalHook.goalByUserId?.data?.createdAt)
                    .year()
                    .toString()
                : year.toString()
            )
            .replace('{team}', goalHook.goalByUserId?.data?.createdBy?.team)}
        </h1>
      </div>
      <GoalTable goal={goalHook.ceoGoal?.data} roleType="CEO" />
      {user?.role === 'Ceo' ? (
        <GoalTable goal={goalHook.goalByUserId?.data} roleType="TEAM_LEADER" />
      ) : (
        <>
          {goalHook.goalByUserId?.data?.status == 'Approved' ? (
            <GoalTable goal={goalHook.goalByUserId?.data} roleType="TEAM_LEADER" />
          ) : (
            <GoalForm
              goal={goalHook.goalByUserId?.data}
              createGoal={goalHook.createGoalFromTeam}
              updateGoal={goalHook.updateGoal}
              type={goalHook.goalByUserId?.data?.id ? 'EDIT' : 'ADD'}
            />
          )}
        </>
      )}
      <CommentHistory comment={goalHook.goalByUserId?.data} />
    </StyledGoalPage>
  );
}
