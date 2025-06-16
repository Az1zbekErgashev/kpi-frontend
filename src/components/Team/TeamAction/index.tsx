import React, { useEffect } from 'react';
import { Button, Input, Modal } from 'ui';
import { StyledTeamAction } from './style';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTeams } from 'hooks/useTeam';

interface props {
  open: boolean;
  team?: any;
  type: 'ADD' | 'EDIT' | 'VIEW';
  title: string;
  handleClose: () => void;
  createTeam: any;
  updateTeam: any;
}

export function TeamAction({ handleClose, open, title, type, team, createTeam, updateTeam }: props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    if (type == 'EDIT') {
      form.setFieldsValue({ ...team });
    }
  }, [open]);

  const onFinish = (values: { name: string }) => {
    if (type == 'ADD') createTeam(values);
    else updateTeam({ id: team.id, name: values.name });
    handleClose();
  };

  return (
    <Modal width={500} footer={[]} onCancel={handleClose} open={open} title={t(title)}>
      <StyledTeamAction>
        <Form onFinish={onFinish} form={form} layout="vertical">
          <Input
            label={t('room_name')}
            name="name"
            rules={[{ required: true, message: t('field_is_required') }]}
            allowClear
          />
          <div className="footer-btn">
            <Button onClick={handleClose} label={t('cancel')} />
            <Button htmlType="submit" type="primary" label={t('create_team')} />
          </div>
        </Form>
      </StyledTeamAction>
    </Modal>
  );
}
