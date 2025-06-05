import { Modal as AntdModal } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'ui/Button';

export interface ModalProps {
  title?: string;
  children?: React.ReactNode;
  open: boolean;
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  okText?: string;
  cancelText?: string;
  zIndex?: number;
  wrapClassName?: string;
  width?: number | string;
  height?: number | string;
  footer?: React.ReactNode;
  forceRender?: any;
  getContainer?: string | false | HTMLElement | undefined;
  destroyOnClose?: boolean;
  centered?: boolean;
  closable?: boolean;
  className?: string;
  afterOpenChange?: boolean;
  submitTitle?: string;
}

export const Modal = ({
  title,
  children,
  open,
  onOk,
  onCancel,
  okText,
  cancelText,
  zIndex = 2050,
  wrapClassName,
  width = 1000,
  forceRender,
  getContainer,
  destroyOnClose,
  closable,
  className,
  submitTitle,
  footer,
}: ModalProps) => {
  const { t } = useTranslation();
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  return (
    <AntdModal
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      zIndex={zIndex}
      wrapClassName={wrapClassName}
      width={width}
      footer={
        footer
          ? footer
          : [
              <div>
                <Button onClick={onCancel} label={t('cancel')} />
                &nbsp;&nbsp;&nbsp;
                <Button onClick={onOk} type="primary" label={t(submitTitle ?? 'submit')} />
              </div>,
            ]
      }
      forceRender={forceRender}
      getContainer={getContainer}
      destroyOnClose={destroyOnClose}
      centered={true}
      closable={closable}
      className={className}
      animation={true}
      mask={true}
      maskClosable={true}
      maskAnimation={true}
      focusTriggerAfterClose={true}
      keyboard={true}
    >
      {children}
    </AntdModal>
  );
};
