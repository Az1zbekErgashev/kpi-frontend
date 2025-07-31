import React, { useEffect, useState } from 'react';
import { StyledScoreManagement } from './style';
import { ScoreManagementList } from 'components';
import useQueryApiClient from 'utils/useQueryApiClient';
import { Button, Checkbox, DatePicker, Input, Modal, Select, SelectOption } from 'ui';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import dayjs from 'dayjs';

export function ScoreManagement() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [yearForm] = Form.useForm();
  const [isFinalScore, setIsFinalScore] = useState<boolean>(false);
  const [isMoreDivision, setIsMoreDivision] = useState<boolean>(false);

  const [actionModa, setActionModal] = useState<{
    open: boolean;
    scoreId?: number;
    divisionId?: number;
    divisions?: number[];
    grade?: string;
    maxScore?: number;
    minScore?: number;
    isMoreDivisions?: boolean;
    isFinalScore?: boolean;
    type: 'ADD' | 'EDIT';
  }>({
    open: false,
    type: 'ADD',
  });
  const currentYear = dayjs().year();

  const {
    data: scoreData,
    refetch: getScore,
    appendData: appendScore,
  } = useQueryApiClient({
    request: {
      url: `/api/evaluation/score-management`,
      method: 'GET',
      data: {
        year: currentYear,
      },
    },
  });

  const { data: divisionData, appendData: appendDivision } = useQueryApiClient({
    request: {
      url: `/api/evaluation/divisions-name`,
      method: 'GET',
      data: {
        year: currentYear,
      },
    },
  });

  const { appendData: createScore } = useQueryApiClient({
    request: {
      url: '/api/evaluation/score',
      method: 'POST',
    },
    onSuccess() {
      getScore();
      setActionModal({ open: false, type: 'ADD' });
      form.resetFields();
    },
  });
  const { appendData: updateScore } = useQueryApiClient({
    request: {
      url: '/api/evaluation/score',
      method: 'PUT',
    },
    onSuccess() {
      getScore();
      setActionModal({ open: false, type: 'ADD' });
      form.resetFields();
    },
  });

  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        if (actionModa.type === 'EDIT') {
          values.id = actionModa.scoreId;
          updateScore(values);
          return;
        }
        createScore({
          ...values,
          year: dayjs(values.year).format('YYYY'),
          isFinalScore: isFinalScore,
          isMoreDivisions: isMoreDivision,
        });
      })
      .catch((error) => {
        console.error('Validation failed:', error);
      });
  };

  useEffect(() => {
    if (actionModa.open && actionModa.type === 'EDIT') {
      form.setFieldsValue({
        divisionId: actionModa.divisionId,
        grade: actionModa.grade,
        maxScore: actionModa.maxScore,
        minScore: actionModa.minScore,
        divisions: actionModa.divisions,
      });

      if (actionModa.isFinalScore) {
        setIsFinalScore(true);
        setIsMoreDivision(false);
      } else if (actionModa.isMoreDivisions) {
        setIsMoreDivision(true);
        setIsFinalScore(false);
      } else {
        setIsFinalScore(false);
        setIsMoreDivision(false);
      }
    }
  }, [actionModa.open]);

  const onValuesChange = (value: any) => {
    appendScore({ year: dayjs(value.year).format('YYYY') });
    appendDivision({ year: dayjs(value.year).format('YYYY') });
  };

  return (
    <StyledScoreManagement>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
        <Form layout="vertical" form={yearForm} onValuesChange={onValuesChange}>
          <DatePicker
            className="date-picker-item"
            defaultValue={dayjs(`${currentYear}-01-01`)}
            label={t('please_select_year')}
            picker="year"
            disabledDate={(current) => current && current.year() > currentYear}
            name="year"
            allowClear={false}
          />
        </Form>
        <Button onClick={() => setActionModal({ open: true, type: 'ADD' })} label={t('create_score')} type="primary" />
      </div>
      <br />
      <ScoreManagementList scoreData={scoreData} setActionModal={setActionModal} getScore={getScore} />
      <Modal
        open={actionModa.open}
        title={t('score_action')}
        width={400}
        onCancel={() => {
          setActionModal({ open: false, type: 'ADD' });
          form.resetFields();
        }}
        onOk={onFinish}
      >
        <StyledScoreManagement>
          <Form form={form} layout="vertical" onFinish={(values) => console.log(values)}>
            <div>
              <Checkbox
                label={t('relation_divisions')}
                onChange={() => {
                  setIsFinalScore(false);
                  setIsMoreDivision(true);
                }}
                checked={isMoreDivision}
                disabled={actionModa.type === 'EDIT'}
              />
              <Checkbox
                label={t('final_score')}
                onChange={() => {
                  setIsFinalScore(true);
                  setIsMoreDivision(false);
                }}
                checked={isFinalScore}
                disabled={actionModa.type === 'EDIT'}
              />
              <Checkbox
                onChange={() => {
                  setIsFinalScore(false);
                  setIsMoreDivision(false);
                }}
                checked={!isFinalScore && !isMoreDivision}
                label={t('by_one_ratio')}
                disabled={actionModa.type === 'EDIT'}
              />
            </div>
            <br />
            {!isFinalScore && !isMoreDivision && (
              <>
                <Select
                  name="divisionId"
                  label={t('division')}
                  rules={[{ required: true, message: t('this_field_required') }]}
                  disabled={actionModa.type === 'EDIT'}
                >
                  {divisionData?.data?.map((item: any, index: number) => (
                    <SelectOption value={item.id} key={index}>
                      {item.name}
                    </SelectOption>
                  ))}
                </Select>
                <br />
                <Input
                  disabled={actionModa.type === 'EDIT'}
                  rules={[{ required: true, message: t('this_field_required') }]}
                  name="grade"
                  label={t('grade')}
                />
                <br />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Input
                    rules={[{ required: true, message: t('this_field_required') }]}
                    name="minScore"
                    label={t('minScore')}
                  />
                  <Input
                    rules={[{ required: true, message: t('this_field_required') }]}
                    name="maxScore"
                    type="number"
                    label={t('maxScore')}
                  />
                </div>
              </>
            )}
            {isFinalScore && (
              <>
                <Input
                  disabled={actionModa.type === 'EDIT'}
                  rules={[{ required: true, message: t('this_field_required') }]}
                  name="grade"
                  label={t('grade')}
                />
                <br />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Input
                    rules={[{ required: true, message: t('this_field_required') }]}
                    name="minScore"
                    label={t('minScore')}
                  />
                  <Input
                    rules={[{ required: true, message: t('this_field_required') }]}
                    name="maxScore"
                    type="number"
                    label={t('maxScore')}
                  />
                </div>
              </>
            )}
            {isMoreDivision && (
              <>
                <Select
                  name="divisions"
                  label={t('divisions')}
                  rules={[{ required: true, message: t('this_field_required') }]}
                  disabled={actionModa.type === 'EDIT'}
                  mode="multiple"
                >
                  {divisionData?.data?.map((item: any, index: number) => (
                    <SelectOption value={item.id} key={index}>
                      {item.name}
                    </SelectOption>
                  ))}
                </Select>
                <br />
                <Input
                  disabled={actionModa.type === 'EDIT'}
                  rules={[{ required: true, message: t('this_field_required') }]}
                  name="grade"
                  label={t('grade')}
                />
                <br />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Input
                    rules={[{ required: true, message: t('this_field_required') }]}
                    name="minScore"
                    label={t('minScore')}
                  />
                  <Input
                    rules={[{ required: true, message: t('this_field_required') }]}
                    name="maxScore"
                    type="number"
                    label={t('maxScore')}
                  />
                </div>
              </>
            )}
            <br />
          </Form>
        </StyledScoreManagement>
      </Modal>
    </StyledScoreManagement>
  );
}
