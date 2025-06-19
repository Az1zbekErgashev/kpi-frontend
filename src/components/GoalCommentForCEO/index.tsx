import React from 'react';
import { StyledGoalCommentForCEO } from './style';
import { Card, Form } from 'antd';
import { Button, TextArea } from 'ui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useComment } from 'hooks/useComment';

interface props {
  status: boolean;
  goal: any;
}

export function GoalCommentForCEO({ status, goal }: props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { sendRequestStatus } = useComment();

  const handleFinish = (status: boolean) => {
    sendRequestStatus({
      goalId: goal?.id,
      comment: form.getFieldValue('comment'),
      status: status,
    });
  };

  return (
    <StyledGoalCommentForCEO>
      {status && (
        <Form form={form} layout="vertical">
          <Card className="comment-card">
            <TextArea name="comment" rows={4} placeholder={t('add_comment_area')} />
            <div className="flex-button">
              <Button onClick={() => handleFinish(true)} label={t('approve')} type="primary" />
              <Button onClick={() => handleFinish(false)} label={t('reject_for_correct')} type="primary" danger />
              <Button label={t('cancel')} onClick={() => navigate(-1)} />
            </div>
          </Card>
        </Form>
      )}
    </StyledGoalCommentForCEO>
  );
}
