import React from 'react';
import { StyledGoalPage } from './style';
import { CommentHistory, GoalForm, GoalTable } from 'components';
import { useGoal } from 'hooks/useGoal';
import { useUser } from 'hooks/useUserState';

export function GoalPage() {
  const goalHook = useGoal();
  const { user } = useUser();

  return (
    <StyledGoalPage>
      <GoalTable goal={goalHook.ceoGoal?.data} />
      {user?.role === 'Ceo' ? (
        <GoalTable goal={goalHook.goalByUserId?.data} />
      ) : (
        <>
          {goalHook.goalByUserId?.data?.status == 'Approved' ? (
            <GoalTable goal={goalHook.goalByUserId?.data} />
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
      <CommentHistory comment={goalHook.goalByUserId?.data?.comments} />
    </StyledGoalPage>
  );
}
