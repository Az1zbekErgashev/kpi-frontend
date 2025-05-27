import React, { useEffect } from 'react';
import { Button, Input, Modal, TextArea } from 'ui';
import { Form, FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';
import { StyledTranslation } from 'pages/Translations/style';

interface props {
  form: FormInstance;
  open: { open: boolean; type: 'ADD' | 'EDIT'; translation: any };
  handleClose: () => void;
  handleSubmitTranslation: () => void;
}

export function TranslationActionForm({ form, open, handleClose, handleSubmitTranslation }: props) {
  const { t } = useTranslation();

  useEffect(() => {
    if (open.type === 'EDIT') {
      form.setFieldsValue(open.translation);
    }
  }, [open.open]);

  const handleKeyPress = (event: any) => {
    if (event.key === ' ') {
      event.preventDefault();
    }
  };

  return (
    <Modal
      forceRender={true}
      onCancel={handleClose}
      title={t('translation_action_title')}
      open={open.open}
      footer={null}
      width={700}
    >
      <StyledTranslation className="translation-modal">
        <Form className="action-form " form={form} layout="vertical">
          <Input
            onKeyDown={handleKeyPress}
            name="key"
            label={t('key')}
            rules={[{ required: true, message: t('field_is_required') }]}
            disabled={open.type == 'EDIT' ? true : false}
          />
          <div className="inputs">
            <TextArea
              allowClear
              maxLength={10000}
              name="textEn"
              label={t('textEn')}
              rules={[{ required: true, message: t('field_is_required') }]}
            />
            <TextArea
              allowClear
              maxLength={10000}
              name="textKo"
              label={t('textKo')}
              rules={[{ required: true, message: t('field_is_required') }]}
            />
            <TextArea
              allowClear
              maxLength={10000}
              name="textUz"
              label={t('textUz')}
              rules={[{ required: true, message: t('field_is_required') }]}
            />
            <TextArea
              allowClear
              maxLength={10000}
              name="textRu"
              label={t('textRu')}
              rules={[{ required: true, message: t('field_is_required') }]}
            />
          </div>
        </Form>
        <div className="action-button">
          <Button onClick={handleClose} label={t('cancel')} />
          <Button onClick={handleSubmitTranslation} type="primary" label={t('save_changes')} />
        </div>
      </StyledTranslation>
    </Modal>
  );
}