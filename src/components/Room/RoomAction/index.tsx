import React, { useEffect } from 'react';
import { StyledRoomAction } from './style';
import { Button, Input, Modal } from 'ui';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

interface props {
  open: boolean;
  room?: any;
  type: 'ADD' | 'EDIT' | 'VIEW';
  title: string;
  handleClose: () => void;
  updateRoom: any;
  createRoom: any;
}

export function RoomAction({ handleClose, open, title, type, room, createRoom, updateRoom }: props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    if (type == 'EDIT') {
      form.setFieldsValue({ ...room });
    }
  }, [open]);

  const onFinish = (values: { name: string }) => {
    if (type == 'ADD') createRoom(values);
    else updateRoom({ id: room.id, name: values.name });
    handleClose();
  };

  return (
    <Modal afterOpenChange={true} width={500} footer={[]} onCancel={handleClose} open={open} title={t(title)}>
      <StyledRoomAction>
        <Form onFinish={onFinish} form={form} layout="vertical">
          <Input
            label={t('room_name')}
            name="name"
            rules={[{ required: true, message: t('field_is_required') }]}
            allowClear
          />
          <div className="footer-btn">
            <Button onClick={handleClose} label={t('cancel')} />
            <Button htmlType="submit" type="primary" label={t('create_room')} />
          </div>
        </Form>
      </StyledRoomAction>
    </Modal>
  );
}
