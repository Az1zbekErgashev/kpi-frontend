'use client';

import { useState } from 'react';
import { StyledGoalForm } from './style';
import { Card, Col, Divider, Form, Radio, Row, Typography } from 'antd';
import { Button, Input, Modal, Select, SelectOption, TextArea } from 'ui';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const STATUS_OPTIONS = [
  { value: 'More', label: 'More' },
  { value: 'Agreement', label: 'Agreement' },
  { value: 'Below', label: 'Below' },
  { value: 'Under', label: 'Under' },
  { value: 'Over', label: 'Over' },
];

export function GoalForm() {
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTargetType, setSelectedTargetType] = useState('');
  const [currentDivisionIndex, setCurrentDivisionIndex] = useState<number | null>(null);
  const [editGoalIndex, setEditGoalIndex] = useState<number | null>(null);

  const TARGET_TYPES = [
    { value: 'RatioType', label: t('radio_type'), icon: '📊' },
    { value: 'NumberType', label: t('number_of_times'), icon: '🔢' },
    { value: 'TextType', label: t('text_type'), icon: '📝' },
    { value: 'IndividualEvaluation', label: t('individual_evaluation'), icon: '⭐' },
    { value: 'LeaderEvaluation', label: t('leader_evaluation'), icon: '👨‍💼' },
  ];

  const handleOpenModal = (divisionIndex: number, goalIndex: number | null = null) => {
    setCurrentDivisionIndex(divisionIndex);
    setEditGoalIndex(goalIndex);

    if (goalIndex !== null) {
      const goal = form.getFieldValue(['divisions', divisionIndex, 'goals', goalIndex]);
      const { goalContent, targetValue } = goal;

      setSelectedTargetType(targetValue.type);
      modalForm.setFieldsValue({
        goalContent,
        type: targetValue.type,
        status: targetValue.status,
        valueRatio: targetValue.valueRatio,
        valueNumber: targetValue.valueNumber,
        valueText: targetValue.valueText,
        evaluationText: targetValue.evaluationText,
      });
    } else {
      modalForm.resetFields();
      setSelectedTargetType('');
    }

    setModalVisible(true);
  };

  const handleCloseModal = () => {
    modalForm.resetFields();
    setSelectedTargetType('');
    setEditGoalIndex(null);
    setModalVisible(false);
  };

  const handleTargetTypeChange = (e: any) => {
    const value = e.target.value;
    setSelectedTargetType(value);
    modalForm.setFieldsValue({ type: value });
  };

  const renderTargetValueFields = () => {
    switch (selectedTargetType) {
      case 'RatioType':
      case 'NumberType': {
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

  const handleKeyDown = (event: any) => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  const onFinish = (value: any) => {
    console.log(value);
  };

  const handleModalSubmit = async () => {
    try {
      const values = await modalForm.validateFields();
      const newGoal = {
        goalContent: values.goalContent,
        assignedToId: 0,
        targetValue: {
          type: values.type,
          status: values.status || null,
          valueRatio: values.valueRatio || 0,
          valueNumber: values.valueNumber || 0,
          valueText: values.valueText || '',
          evaluationText: values.evaluationText || '',
        },
      };

      const divisions = form.getFieldValue('divisions') || [];
      const division = divisions[currentDivisionIndex!];
      const goals = division.goals || [];

      const updatedGoals =
        editGoalIndex !== null
          ? goals.map((goal: any, i: number) => (i === editGoalIndex ? newGoal : goal))
          : [...goals, newGoal];

      form.setFieldsValue({
        divisions: divisions.map((d: any, i: number) =>
          i === currentDivisionIndex ? { ...d, goals: updatedGoals } : d
        ),
      });

      handleCloseModal();
    } catch (err) {
      console.log('Validation failed:', err);
    }
  };

  const handleDeleteGoal = (divisionIndex: number, goalIndex: number) => {
    const divisions = form.getFieldValue('divisions') || [];
    const division = divisions[divisionIndex];
    const goals = division.goals || [];

    const updatedGoals = goals.filter((_: any, index: number) => index !== goalIndex);

    const updatedDivisions = divisions.map((div: any, index: number) => {
      if (index === divisionIndex) {
        return { ...div, goals: updatedGoals };
      }
      return div;
    });

    form.setFieldsValue({
      divisions: updatedDivisions,
    });
  };

  return (
    <StyledGoalForm>
      <div className="kpi-form-container">
        <Card className="main-card">
          <Form form={form} layout="vertical" className="kpi-form" onFinish={onFinish}>
            <Form.List name="divisions" initialValue={[{}]}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name }, index) => (
                    <Card key={key} className="division-card" size="small">
                      <Row gutter={[16, 16]} align="stretch">
                        <Col xs={24} sm={2} md={1} className="division-number-col">
                          <div className="division-number">{index + 1}</div>
                        </Col>
                        <Col xs={24} sm={11} md={6}>
                          <Input
                            name={[name, 'name']}
                            rules={[{ required: true, message: t('this_field_required') }]}
                            placeholder={t('division')}
                            label={t('division_name')}
                          />
                        </Col>
                        <Col xs={12} sm={6} md={2}>
                          <Input
                            name={[name, 'ratio']}
                            className="no-arrows"
                            min={0}
                            max={100}
                            maxLength={3}
                            onKeyDown={handleKeyDown}
                            placeholder={t('ratio')}
                            addonAfter="%"
                            label={t('division_ratio')}
                            rules={[{ required: true, message: t('this_field_required') }]}
                          />
                        </Col>
                        <Col xs={24} sm={24} md={12}>
                          <div className="goals-section">
                            <Form.List name={[name, 'goals']}>
                              {(goalFields) => (
                                <>
                                  {goalFields.map((goalField, goalIndex) => {
                                    const goalPath = ['divisions', index, 'goals', goalIndex];
                                    const goal = form.getFieldValue(goalPath);
                                    const { goalContent, targetValue } = goal || {};
                                    const { type, valueRatio, valueNumber, valueText, evaluationText, status } =
                                      targetValue || {};

                                    const TYPE_LABELS = {
                                      RatioType: `📊 ${t('ratio_type')}`,
                                      NumberType: `🔢 ${t('number_type')}`,
                                      TextType: `📝 ${t('text_type')}`,
                                      IndividualEvaluation: `👤 ${t('individual_evaluation')}`,
                                      LeaderEvaluation: `🧑‍💼 ${t('leader_evaluation')}`,
                                    } as const;

                                    let displayValue: string | null = null;

                                    if (type === 'RatioType') {
                                      displayValue = valueText
                                        ? `${valueText} : ${valueRatio ?? 0}% ${status}`
                                        : `${valueRatio ?? ''}% ${status}`;
                                    } else if (type === 'NumberType') {
                                      displayValue = valueText
                                        ? `${valueText} : ${valueNumber ?? 0} ${status}`
                                        : `${valueNumber ?? ''}% ${status}`;
                                    } else if (type === 'IndividualEvaluation' || type === 'LeaderEvaluation') {
                                      const label =
                                        type === 'IndividualEvaluation'
                                          ? t('[individual_evaluation]')
                                          : t('[leader_evaluation]');
                                      displayValue = evaluationText ? `${evaluationText} ${label}` : label;
                                    } else if (type === 'TextType') {
                                      displayValue = t('text_type');
                                    }

                                    return (
                                      <div key={goalField.key} className="goal-item">
                                        <div className="goal-content">
                                          <Typography.Text strong>🎯 {goalContent}</Typography.Text>
                                          <br />
                                          <Typography.Text type="secondary" className="goal-type">
                                            {TYPE_LABELS[type as keyof typeof TYPE_LABELS] || t('type_not_found')}
                                          </Typography.Text>
                                          {displayValue && (
                                            <Typography.Text className="goal-target">
                                              {t('target_value')}: {displayValue}
                                            </Typography.Text>
                                          )}
                                        </div>
                                        <Button
                                          type="link"
                                          size="small"
                                          onClick={() => handleOpenModal(index, goalIndex)}
                                          label={`✏️ ${t('edit')}`}
                                          className="edit-goal-btn"
                                        />
                                        &nbsp;
                                        <Button
                                          type="link"
                                          size="small"
                                          onClick={() => handleDeleteGoal(index, goalIndex)}
                                          label={`🗑️ ${t('delete')}`}
                                          className="edit-goal-btn"
                                        />
                                      </div>
                                    );
                                  })}
                                </>
                              )}
                            </Form.List>
                            <Button
                              type="dashed"
                              icon={<PlusOutlined />}
                              onClick={() => handleOpenModal(index)}
                              block
                              className="add-goal-btn"
                              label={t('add_goal')}
                            />
                          </div>
                        </Col>
                        <Col className="action-buttons-col" xs={12} sm={5} md={3}>
                          <div className="action-buttons">
                            <Button
                              type="primary"
                              icon={<PlusOutlined />}
                              size="small"
                              onClick={() => add()}
                              className="add-division-btn"
                            />
                            {fields.length > 1 && (
                              <Button
                                type="primary"
                                danger
                                icon={<MinusCircleOutlined />}
                                size="small"
                                onClick={() => remove(name)}
                                className="remove-division-btn"
                              />
                            )}
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </>
              )}
            </Form.List>

            <Card className="comment-card">
              <Form.Item name="comment">
                <TextArea rows={4} placeholder={t('add_comment_area')} />
              </Form.Item>
            </Card>

            <Divider />

            <div className="submit-section">
              <Button type="primary" size="large" className="submit-btn" label={t('send_request')} htmlType="submit" />
            </div>

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
                  rules={[{ required: true, message: t('this_field_required') }]}
                >
                  <TextArea rows={2} allowClear />
                </Form.Item>

                <Divider>{t('target_value')}</Divider>

                <Form.Item
                  name="type"
                  label={t('target_type')}
                  rules={[{ required: true, message: t('please_choose_value') }]}
                >
                  <Radio.Group onChange={handleTargetTypeChange} className="target-type-radio">
                    {TARGET_TYPES.map(({ value, label, icon }) => (
                      <Radio key={value} value={value} className="target-type-option">
                        <span className="target-type-icon">{icon}</span>
                        <span className="target-type-label">{label}</span>
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
          </Form>
        </Card>
      </div>
    </StyledGoalForm>
  );
}
