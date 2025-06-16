'use client';

import { useEffect, useState } from 'react';
import { StyledGoalForm } from './style';
import { Card, Col, Divider, Form, Row, Typography } from 'antd';
import { Button, Input, Select, SelectOption, TextArea } from 'ui';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { GoalFormModal } from 'components';

export function GoalForm({ goal, createGoal, updateGoal, type }: any) {
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTargetType, setSelectedTargetType] = useState('');
  const [currentDivisionIndex, setCurrentDivisionIndex] = useState<number | null>(null);
  const [editGoalIndex, setEditGoalIndex] = useState<number | null>(null);

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

  const handleKeyDown = (event: any) => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  const onFinish = (value: any) => {
    if (type == 'ADD') {
      createGoal(value);
    } else {
      updateGoal({ ...value, goalId: goal.id });
    }
  };

  useEffect(() => {
    if (type === 'ADD') {
      return;
    } else {
      form.setFieldsValue({ ...goal });
    }
  }, [goal]);

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
            <Input type="hidden" name="id" size="small" />
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
                            rules={[{ required: true, message: t('field_is_required') }]}
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
                            rules={[{ required: true, message: t('field_is_required') }]}
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
                                      NumberOfTimesType: `🔢 ${t('number_type')}`,
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
            <GoalFormModal
              handleCloseModal={handleCloseModal}
              handleKeyDown={handleKeyDown}
              handleModalSubmit={handleModalSubmit}
              handleTargetTypeChange={handleTargetTypeChange}
              modalForm={modalForm}
              modalVisible={modalVisible}
              selectedTargetType={selectedTargetType}
            />
          </Form>
        </Card>
      </div>
    </StyledGoalForm>
  );
}
