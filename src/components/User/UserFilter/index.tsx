import React from 'react';
import { StyledUsersFilter } from './style';
import { Form, Upload, message } from 'antd';
import { Button, Input } from 'ui';
import { useTranslation } from 'react-i18next';
import { UploadOutlined } from '@ant-design/icons';
import { routes } from 'config/config';
import useJwt from 'utils/useJwt';

interface props {
  handleValueChange: any;
  setActionModalConfig: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      type: 'ADD' | 'EDIT' | 'VIEW';
      user?: any;
      title: string;
    }>
  >;
}

export function UsersFilter({ handleValueChange, setActionModalConfig }: props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { getHeader } = useJwt();
  const handleUploadChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} ${t('uploaded_successfully')}`);
      window.location.reload(); // перезагрузка после успешной загрузки
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} ${t('upload_failed')}`);
    }
  };

  const onValuesChange = (changedValues: any, allValues: any) => {
    const trimmedValues = {
      ...changedValues,
      text: changedValues.text ? changedValues.text.trim() : changedValues.text,
    };
    handleValueChange(trimmedValues);
  };

  return (
    <StyledUsersFilter>
      <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
        <Input
          allowClear
          name="text"
          label={t('search_by_username_fullname_team')}
        />
      </Form>

      <div style={{ display: 'flex', gap: 8 }}>
        <Button
          label={t('create_user')}
          type="primary"
          onClick={() => setActionModalConfig({ open: true, title: 'add_user', type: 'ADD' })}
        />

        <Upload
          name="file"
          accept=".xlsx,.xls"
          showUploadList={false}
          action={`${routes.api.baseUrl}/api/user`}
          onChange={handleUploadChange}
          headers={{
            Authorization: getHeader(),
          }}
        >
          <Button icon={<UploadOutlined />} label={t('upload_excel')} />
        </Upload>
      </div>
    </StyledUsersFilter>
  );
}