import React, { useEffect } from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { Button, Input, Modal, Select, SelectOption } from 'ui';
import { StyledHomeAction } from './style';
import { USER_ROLE } from 'utils/consts';

interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  userName: string;
  fullName: string;
  role: 'Ceo' | 'Director' | 'TeamLead' | 'TeamMember';
  teamId: number;
  roomId: number;
  team: string;
  room: string;
  isDeleted: number;
}

interface Room {
  id: number;
  createdAt: string;
  name: string;
  teamsCount: number;
  isDeleted: number;
}

interface Team {
  id: number;
  name: string;
}

interface Props {
  open: boolean;
  user?: User;
  type: 'ADD' | 'EDIT' | 'VIEW';
  title: string;
  handleClose: () => void;
  handleCreateUser: (data: {
    fullName: string;
    userName: string;
    password: string;
    role: 'Ceo' | 'Director' | 'TeamLead' | 'TeamMember';
    teamId: number;
    roomId: number;
  }) => Promise<void>;
  handleUpdateUser: (data: {
    id: number;
    fullName: string;
    userName: string;
    role: 'Ceo' | 'Director' | 'TeamLead' | 'TeamMember';
    teamId: number;
    roomId: number;
  }) => Promise<void>;
  roomData: Room[];
  teamData: Team[];
}

export function HomeAction({
  open,
  title,
  type,
  user,
  handleClose,
  handleCreateUser,
  handleUpdateUser,
  roomData,
  teamData,
}: Props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    if (type === 'EDIT' && user) {
      form.setFieldsValue({ ...user, password: '*********' });
    }
  }, [open, user, type, form]);

  const onFinish = (values: {
    fullName: string;
    userName: string;
    password?: string;
    role: 'Ceo' | 'Director' | 'TeamLead' | 'TeamMember';
    teamId: number;
    roomId: number;
  }) => {
    if (type === 'ADD') {
      handleCreateUser({ ...values, password: values.password || '' });
    } else if (type === 'EDIT' && user) {
      handleUpdateUser({ id: user.id, ...values });
    }
    handleClose();
  };

  return (
    <Modal width={550} open={open} title={title} onCancel={handleClose} footer={[]}>
      <StyledHomeAction>
        <Form onFinish={onFinish} form={form} layout="vertical">
          <div className="flex">
            <Form.Item
              label={t('full_name')}
              name="fullName"
              rules={[{ required: true, message: t('this_field_required') }]}
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item
              label={t('user_name')}
              name="userName"
              rules={[{ required: true, message: t('this_field_required') }]}
            >
              <Input allowClear />
            </Form.Item>
          </div>
          <div className="flex">
            <Form.Item
              label={t('password')}
              name="password"
              rules={[{ required: type === 'ADD', message: t('this_field_required') }]}
            >
              <Input allowClear disabled={type === 'EDIT'} />
            </Form.Item>
            <Form.Item
              label={t('role')}
              name="role"
              rules={[{ required: true, message: t('this_field_required') }]}
            >
              <Select allowClear showSearch={false}>
                {USER_ROLE.map((item, index) => (
                  <SelectOption value={item.value} key={index}>
                    {t(item.key)}
                  </SelectOption>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="flex">
            <Form.Item
              label={t('team')}
              name="teamId"
              rules={[{ required: true, message: t('this_field_required') }]}
            >
              <Select allowClear>
                {teamData.map((item: Team, index: number) => (
                  <SelectOption value={item.id} key={index}>
                    {item.name}
                  </SelectOption>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={t('room')}
              name="roomId"
              rules={[{ required: true, message: t('this_field_required') }]}
            >
              <Select allowClear>
                {roomData.map((item: Room, index: number) => (
                  <SelectOption value={item.id} key={index}>
                    {item.name}
                  </SelectOption>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="footer-btn">
            <Button onClick={handleClose} label={t('cancel')} />
            <Button onClick={() => form.submit()} type="primary" label={t(type === 'ADD' ? 'create_user' : 'update_user')} />
          </div>
        </Form>
      </StyledHomeAction>
    </Modal>
  );
}