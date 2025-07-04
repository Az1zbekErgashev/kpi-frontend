import React, { useEffect } from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { Button, Input, Modal, Select, SelectOption } from 'ui';
import { StyledUserAction } from './style';
import { USER_ROLE } from 'utils/consts';

interface props {
  open: boolean;
  user?: any;
  type: 'ADD' | 'EDIT' | 'VIEW';
  title: string;
  handleClose: () => void;
  updateUser: any;
  createUser: any;
  roomData: any;
  teamData: any;
  positions: { data: { name: string; id: number }[] };
}

export function UserAction({
  open,
  title,
  type,
  user,
  handleClose,
  createUser,
  updateUser,
  roomData,
  teamData,
  positions,
}: props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    if (type == 'EDIT') {
      form.setFieldsValue({ ...user, password: '*********', positionId: user?.position?.id });
    }
  }, [open]);

  const onFinish = (values: { name: string }) => {
    if (type == 'ADD') createUser(values);
    else updateUser({ id: user.id, ...values });
    handleClose();
  };

  return (
    <Modal width={550} open={open} title={t(title)} onCancel={handleClose} footer={[]}>
      <StyledUserAction>
        <Form onFinish={onFinish} form={form} layout="vertical">
          <div className="flex">
            <Input
              label={t('full_name')}
              rules={[{ required: true, message: t('field_is_required') }]}
              allowClear
              name="fullName"
            />
            <Input
              label={t('user_name')}
              rules={[{ required: true, message: t('field_is_required') }]}
              allowClear
              name="userName"
            />
          </div>
          <div className="flex">
            <Input
              label={t('password')}
              rules={[{ required: true, message: t('field_is_required') }]}
              allowClear
              name="password"
              disabled={type == 'EDIT' ? true : false}
            />
            <Select
              label={t('role')}
              rules={[{ required: true, message: t('field_is_required') }]}
              allowClear
              showSearch={false}
              name="role"
            >
              {USER_ROLE.map((item, index) => (
                <SelectOption value={item.value} key={index}>
                  {t(item.key)}
                </SelectOption>
              ))}
            </Select>
          </div>
          <div className="flex">
            <Select label={t('team')} allowClear name="teamId">
              {teamData?.data?.map((item: { name: string; id: number }, index: number) => (
                <SelectOption value={item.id} key={index}>
                  {item.name}
                </SelectOption>
              ))}
            </Select>
            <Select
              label={t('room')}
              allowClear
              name="roomId"
              rules={[{ required: true, message: t('field_is_required') }]}
            >
              {roomData?.data?.map((item: { name: string; id: number }, index: number) => (
                <SelectOption value={item.id} key={index}>
                  {item.name}
                </SelectOption>
              ))}
            </Select>
          </div>
          <div className="flex">
            <Select showSearch={false} label={t('position')} allowClear name="positionId">
              {positions?.data?.map((item, index) => (
                <SelectOption key={index} value={item.id}>
                  {t(item.name)}
                </SelectOption>
              ))}
            </Select>
          </div>
        </Form>
        <div className="footer-btn">
          <Button onClick={handleClose} label={t('cancel')} />
          <Button onClick={() => form.submit()} type="primary" label={type == "EDIT" ? t('edit_user_button') : t('create_user')} />
        </div>
      </StyledUserAction>
    </Modal>
  );
}
