import React, { useEffect } from 'react';
import { Button } from 'ui/Button';
import { Modal, ModalProps } from 'ui/Modal';
import { StyledConiformModal } from './style';

interface ConfirmModalProps extends ModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  title: string;
  content: React.ReactNode;
  danger?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open = false,
  onConfirm,
  onCancel,
  confirmText = 'confirm',
  cancelText = 'cancel',
  title = 'are_you_sure',
  content = '',
  danger = true,
  ...restProps
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  return (
    <Modal {...restProps} width={400} open={open} onCancel={onCancel} footer={[]}>
      <StyledConiformModal>
        <div className={danger ? 'title' : 'title title-green'}>{title}</div>
        <div className="content">{content}</div>
        <div className="profile-modal-buttons">
          <Button className="btn" type="default" onClick={onCancel} label={cancelText} />
          <Button className="btn" type="primary" danger={danger} onClick={onConfirm} label={confirmText} />
        </div>
      </StyledConiformModal>
    </Modal>
  );
};
