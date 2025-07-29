import React, { useState } from 'react';
import { StyledProfile } from './style';
import { Button, Checkbox, Input, Select, SelectOption } from 'ui';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import useQueryApiClient from 'utils/useQueryApiClient';
import dayjs from 'dayjs';

export function Profile() {
  const { t } = useTranslation();
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const UserIcon = () => (
    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );

  const { data: profile } = useQueryApiClient({
    request: {
      url: '/api/user/profile',
      method: 'GET',
    },
    onSuccess(response) {
      form.setFieldsValue({
        fullName: response?.data?.fullName,
        positionId: response?.data?.positionId,
      });
    },
  });

  const { data: position, isLoading } = useQueryApiClient({
    request: {
      url: '/api/user/position',
    },
  });

  const { appendData } = useQueryApiClient({
    request: {
      url: '/api/user',
      method: 'PUT',
    },
    onError(error) {
      if (error.error == 'old_password_not_correct') {
        form.setFields([
          {
            name: 'currentPassword',
            errors: [t('incorrect_current_password')],
          },
        ]);
      }
    },
  });

  const handleSubmit = (value: any) => {
    value.updatePassword = changePassword;

    if (changePassword && value.newPassword !== value.confirmPassword) {
      form.setFields([
        {
          name: 'confirmPassword',
          errors: [t('passwords_do_not_match')],
        },
      ]);
      return;
    }

    appendData(value);
  };

  return (
    <StyledProfile>
      <div className="content-wrapper">
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <UserIcon />
              {t('account_information')}
            </div>
            <div className="card-description">{t('update_profile_description')}</div>
          </div>
          <div className="card-content">
            <Form form={form} layout="vertical" onFinish={handleSubmit} className="form">
              <div className="form-section">
                <div className="form-group">
                  <Input
                    label={t('full_name')}
                    name="fullName"
                    rules={[{ required: true, message: t('this_field_required') }]}
                  />
                </div>

                <div className="form-group">
                  <Select allowClear loading={isLoading} label={t('position')} name="positionId">
                    {position?.data?.map((item: any) => (
                      <SelectOption key={item.id} value={item.id}>
                        {t(item.name)}
                      </SelectOption>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="separator"></div>

              <div className="form-section">
                <div className="checkbox-wrapper">
                  <Checkbox
                    checked={changePassword}
                    onChange={() => setChangePassword(!changePassword)}
                    label={t('change_password')}
                  />
                </div>
                <p className="input-description" style={{ marginLeft: '1.5rem' }}>
                  {t('change_password_description')}
                </p>

                {changePassword && (
                  <div className="password-section">
                    <div className="form-group">
                      <div className="password-input-wrapper">
                        <Input
                          rules={[{ required: changePassword, message: t('this_field_required') }]}
                          type="password"
                          name="currentPassword"
                          label={t('currentPassword')}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="password-input-wrapper">
                        <Input
                          rules={[{ required: changePassword, message: t('this_field_required') }]}
                          type="password"
                          name="newPassword"
                          label={t('newPassword')}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="password-input-wrapper">
                        <Input
                          rules={[{ required: changePassword, message: t('this_field_required') }]}
                          type="password"
                          name="confirmPassword"
                          label={t('confirmPassword')}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="separator"></div>

              <div className="button-actions">
                <Button onClick={() => navigate(-1)} label={t('cancel')} className="button button-outline" />
                <Button type="primary" htmlType="submit" label={t('save_changes')} className="button button-primary" />
              </div>
            </Form>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="footer-info">
              {profile?.data?.updatedAt && (
                <p>
                  {t('last_update')}: {dayjs(profile.data.updatedAt).format('YYYY.MM.DD')}
                </p>
              )}
              <p>{t('last_update_description')}</p>
            </div>
          </div>
        </div>
      </div>
    </StyledProfile>
  );
}
