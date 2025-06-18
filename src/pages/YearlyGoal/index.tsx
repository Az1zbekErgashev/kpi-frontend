import React, { useEffect, useState } from 'react';
import { StyledYearlyGoal } from './style';
import { GoalForm, GoalTable, YearlyGoalFilter } from 'components';
import dayjs from 'dayjs';
import { useYearlyGoal } from 'hooks/useYearlyGoal';
import { Button } from 'ui';
import { useTranslation } from 'react-i18next';

export function YearlyGoal() {
  const yearlyGoal = useYearlyGoal();
  const { t } = useTranslation();
  const [formStatus, setFormStatus] = useState<boolean>(false);
  const handleValueChange = (value: any) => {
    yearlyGoal.setQueryParams((prev: any) => ({
      ...prev,
      year: dayjs(value.year).format('YYYY'),
    }));
  };

  useEffect(() => {
    if (yearlyGoal?.status?.data) {
      setFormStatus(true);
    } else setFormStatus(true);
  }, [yearlyGoal?.status?.data]);

  return (
    <StyledYearlyGoal>
      {formStatus && (
        <>
          <YearlyGoalFilter handleValueChange={handleValueChange} />
          <br />
          <GoalTable goalAndTeam={{ room: '', team: '' }} goal={yearlyGoal?.status?.data} roleType="TEAM_LEADER" />
        </>
      )}
      <br />
      {formStatus ? (
        <div className="submit-section">
          <Button
            onClick={() => setFormStatus(false)}
            type="primary"
            size="large"
            className="submit-btn"
            label={t('update_yearly_gaol')}
          />
        </div>
      ) : (
        <GoalForm
          createGoal={yearlyGoal.createGoalFromCeo}
          updateGoal={yearlyGoal.updateGoal}
          goal={yearlyGoal.status}
          type={yearlyGoal.status?.data?.id ? 'EDIT' : 'ADD'}
          setFormStatus={setFormStatus}
        />
      )}
    </StyledYearlyGoal>
  );
}
