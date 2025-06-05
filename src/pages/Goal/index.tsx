import React from 'react';
import { StyledGoalPage } from './style';
import { GoalForm, GoalTable } from 'components';
import { useGoal } from 'hooks/useGoal';
import { useUser } from 'hooks/useUserState';

export function GoalPage() {
  const goalHook = useGoal();
  const { user } = useUser();
  console.log(user);

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
            <GoalForm />
          )}
        </>
      )}
    </StyledGoalPage>
  );
}
