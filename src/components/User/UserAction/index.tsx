import React, { useEffect } from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { Button, Input, Modal, Select } from 'ui';
import { StyledUserAction } from './style';

interface props {
  open: boolean;
  user?: any;
  type: 'ADD' | 'EDIT' | 'VIEW';
  title: string;
  handleClose: () => void;
}

export function UserAction({ open, title, type, user, handleClose }: props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    if (type == 'EDIT') {
      form.setFieldsValue({ ...user, password: '*********' });
    }
  }, [open]);

  return (
    <Modal width={500} open={open} title={title} onCancel={handleClose} footer={[]}>
      <StyledUserAction>
        <Form form={form} layout="vertical">
          <div className="flex">
            <Input
              label={t('full_name')}
              rules={[{ required: true, message: t('this_field_required') }]}
              allowClear
              name="fullName"
            />
            <Input
              label={t('user_name')}
              rules={[{ required: true, message: t('this_field_required') }]}
              allowClear
              name="userName"
            />
          </div>
          <div className="flex">
            <Input
              label={t('password')}
              rules={[{ required: true, message: t('this_field_required') }]}
              allowClear
              name="password"
              disabled={type == 'EDIT' ? true : false}
            />
            <Select
              label={t('role')}
              rules={[{ required: true, message: t('this_field_required') }]}
              allowClear
              showSearch={false}
              name="role"
            ></Select>
          </div>
          <div className="flex">
            <Select
              label={t('team')}
              allowClear
              name="teamId"
              rules={[{ required: true, message: t('this_field_required') }]}
            ></Select>
            <Select
              label={t('room')}
              allowClear
              name="roomId"
              rules={[{ required: true, message: t('this_field_required') }]}
            ></Select>
          </div>
        </Form>
        <div className="footer-btn">
          <Button onClick={handleClose} label={t('cancel')} />
          <Button type="primary" label={t('create_user')} />
        </div>
      </StyledUserAction>
    </Modal>
  );
}
