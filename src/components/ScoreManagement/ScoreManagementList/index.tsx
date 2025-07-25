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
      grade?: string;
      score?: number;
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
    { dataIndex: 'divisionName', key: 'divisionName', title: t('divisionName') },
    { dataIndex: 'grade', key: 'grade', title: t('grade') },
    { dataIndex: 'score', key: 'score', title: t('score') },
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
                score: record.score,
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
