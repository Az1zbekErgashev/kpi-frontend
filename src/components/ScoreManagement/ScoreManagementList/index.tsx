import { ColumnsType } from 'antd/es/table';
import { TFunction } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ConfirmModal, Table } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';

interface props {
  scoreData: any;
  setActionModal: React.Dispatch<
    React.SetStateAction<{
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
    }>
  >;
  getScore: () => void;
}

const createModalConfig = (t: TFunction, onConfirm: () => void, onCancel: () => void) => ({
  cancelText: t('cancel'),
  confirmText: t('delete'),
  title: t('delete_score_title'),
  content: t('delete_score_description'),
  open: true,
  onConfirm,
  onCancel,
});
export function ScoreManagementList({ scoreData, setActionModal, getScore }: props) {
  const { t } = useTranslation();
  const [coniformModal, setConiformModal] = useState<any>(null);
  const [scoreId, setScoreId] = useState<number | null>(null);
  const columns: ColumnsType = [
    {
      dataIndex: 'divisionName',
      key: 'divisionName',
      title: t('divisionName'),
      render: (text) => text || t('no_division'),
    },
    {
      dataIndex: 'isFinalScore',
      key: 'isFinalScore',
      title: t('isFinalScore'),
      render: (text) => (text ? t('yes') : t('no')),
    },
    {
      dataIndex: 'isMoreDivisions',
      key: 'isMoreDivisions',
      title: t('isMoreDivisionScore'),
      render: (text) => (text ? t('yes') : t('no')),
    },
    { dataIndex: 'grade', key: 'grade', title: t('grade') },
    { dataIndex: 'minScore', key: 'minScore', title: t('minScore') },
    { dataIndex: 'maxScore', key: 'maxScore', title: t('maxScore') },
    {
      dataIndex: 'action',
      key: 'action',
      title: t('action'),
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <Button
            label={t('update')}
            onClick={() =>
              setActionModal({
                open: true,
                type: 'EDIT',
                divisionId: record.divisionId,
                grade: record.grade,
                maxScore: record.maxScore,
                minScore: record.minScore,
                isFinalScore: record.isFinalScore,
                isMoreDivisions: record.isMoreDivisions,
                divisions: record.divisions,
                scoreId: record.scoreId,
              })
            }
            type="primary"
          />
          <Button label={t('delete')} danger onClick={() => handleOpenConfirmModal(t, record.scoreId)} />
        </div>
      ),
    },
  ];

  const { refetch: deleteScore } = useQueryApiClient({
    request: {
      url: `/api/evaluation/score/${scoreId}`,
      method: 'DELETE',
    },
    onSuccess() {
      getScore();
    },
  });

  const handleOpenConfirmModal = (t: TFunction, id: number) => {
    setConiformModal(
      createModalConfig(
        t,
        () => {
          setScoreId(id);
        },
        () => {
          setConiformModal(null);
        }
      )
    );
  };

  useEffect(() => {
    if (scoreId) {
      deleteScore();
    }
    setScoreId(null);
    setConiformModal(null);
  }, [scoreId]);

  return (
    <div>
      <Table columns={columns} dataSource={scoreData?.data ?? []} />
      {coniformModal && <ConfirmModal {...coniformModal} />}
    </div>
  );
}
