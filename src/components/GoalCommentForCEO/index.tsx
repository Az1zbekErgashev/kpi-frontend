import React from 'react';
import { StyledGoalCommentForCEO } from './style';
import { Card, Form } from 'antd';
import { Button, TextArea } from 'ui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface props {
  status: boolean;
}

export function GoalCommentForCEO({ status }: props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <StyledGoalCommentForCEO>
      {status ? (
        <Form>
          <Card className="comment-card">
            <TextArea name="comment" rows={4} placeholder={t('add_comment_area')} />
            <div className="flex-button">
              <Button label={t('approve')} type="primary" />
              <Button label={t('reject_for_correct')} type="primary" danger />
              <Button label={t('cancel')} onClick={() => navigate(-1)} />
            </div>
          </Card>
        </Form>
      ) : (
        <div className="flex-button">
          <Button label={t('cancel')} onClick={() => navigate(-1)} />
        </div>
      )}
    </StyledGoalCommentForCEO>
  );
}
