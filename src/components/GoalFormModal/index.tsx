import { Col, Divider, Form, Radio, Row } from 'antd';
import { FormInstance } from 'antd/lib';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Modal, Select, SelectOption, TextArea } from 'ui';
import { STATUS_OPTIONS, TARGET_TYPES } from 'utils/consts';

interface props {
  modalVisible: boolean;
  handleModalSubmit: any;
  handleCloseModal: () => void;
  modalForm: FormInstance;
  handleTargetTypeChange: any;
  selectedTargetType: any;
  handleKeyDown: any;
}

export function GoalFormModal({
  handleCloseModal,
  handleModalSubmit,
  handleTargetTypeChange,
  modalForm,
  modalVisible,
  selectedTargetType,
  handleKeyDown,
}: props) {
  const { t } = useTranslation();

  const renderTargetValueFields = () => {
    switch (selectedTargetType) {
      case 'RatioType':
      case 'NumberOfTimesType': {
        const isRatio = selectedTargetType === 'RatioType';
        return (
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={14}>
              <Input name="valueText" label={t('text')} />
            </Col>
            <Col xs={12} sm={8} md={5}>
              <Input
                name={isRatio ? 'valueRatio' : 'valueNumber'}
                label={t('ratio')}
                min={0}
                max={100}
                maxLength={3}
                onKeyDown={handleKeyDown}
                addonAfter="%"
              />
            </Col>
            <Col xs={12} sm={8} md={5}>
              <Select defaultValue={'More'} initialValue={'More'} showSearch={false} name="status" label="Условие">
                {STATUS_OPTIONS.map(({ value, label }) => (
                  <SelectOption key={value} value={value}>
                    {label}
                  </SelectOption>
                ))}
              </Select>
            </Col>
          </Row>
        );
      }

      case 'TextType':
        return <></>;

      case 'IndividualEvaluation':
      case 'LeaderEvaluation':
        return <TextArea rows={4} name="evaluationText" allowClear />;

      default:
        return null;
    }
  };
  return (
    <Modal
      title={t('add_target_indicator')}
      open={modalVisible}
      onOk={handleModalSubmit}
      onCancel={handleCloseModal}
      width={800}
      className="target-modal"
    >
      <Form form={modalForm} layout="vertical">
        <Form.Item
          name="goalContent"
          label={t('goal_content')}
          rules={[{ required: true, message: t('field_is_required') }]}
        >
          <TextArea rows={2} allowClear />
        </Form.Item>

        <Divider>{t('target_value')}</Divider>
        <Input type="hidden" name="id" size="small" />

        <Form.Item name="type" label={t('target_type')} rules={[{ required: true, message: t('please_choose_value') }]}>
          <Radio.Group onChange={handleTargetTypeChange} className="target-type-radio">
            {TARGET_TYPES?.map(({ value, label, icon }) => (
              <Radio key={value} value={value} className="target-type-option">
                <span className="target-type-icon">{icon}</span>
                <span className="target-type-label">{t(label)}</span>
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        {selectedTargetType && (
          <div className="target-fields-section">
            {selectedTargetType !== 'TextType' && <Divider>{t('parametrs')}</Divider>}
            {renderTargetValueFields()}
          </div>
        )}
      </Form>
    </Modal>
  );
}
