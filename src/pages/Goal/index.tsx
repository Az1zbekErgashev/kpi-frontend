import React from 'react';
import { StyledGoalPage } from './style';
import { CommentHistory, GoalCommentForCEO, GoalTable } from 'components';
import { useGoal } from 'hooks/useGoal';
import { useTranslation } from 'react-i18next';
import { BackButton } from 'ui';
import { useNavigate, useParams } from 'react-router-dom';

export function GoalPage() {
  const goalHook = useGoal();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const year = new Date().getFullYear().toString();
  const selectedYear = params.year;

  return (
    <StyledGoalPage>
      <div className="styled_header">
        <BackButton onClick={() => navigate(-1)} color="black" label={t('back')} />
        <h1 className="title">
          {t('goal_page_title_with_room')
            .replace('{year}', selectedYear?.toString() ?? year)
            .replace('{team}', goalHook.rommAndTeam?.data?.team ?? '')}
        </h1>
      </div>
      <GoalTable goalAndTeam={goalHook.rommAndTeam?.data} goal={goalHook.ceoGoal?.data} roleType="CEO" />
      <br />
      <br />
      <GoalTable goalAndTeam={goalHook.rommAndTeam?.data} goal={goalHook.goalByUserId?.data} roleType="TEAM_LEADER" />
      {goalHook.goalByUserId?.data?.createdAt && <CommentHistory comment={goalHook.goalByUserId?.data} />}
      <GoalCommentForCEO status={goalHook.goalByUserId?.data?.createdAt ? true : false} />
    </StyledGoalPage>
  );
}
