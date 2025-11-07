import React, { useEffect, useState, useRef, useCallback } from 'react';
import { TranslationsList } from './components/TranslationsList';
import { TranslationsFilter } from './components/TranslationsFilter';
import { Button, ConfirmModal, Notification } from 'ui';
import { useTranslation } from 'react-i18next';
import useQueryApiClient from 'utils/useQueryApiClient';
import Pagination from 'ui/Pagination/Pagination';
import { TFunction } from 'i18next';
import { Form } from 'antd';
import { TranslationActionForm } from './components/TranslationsActionForm';
import { useSearchParams } from 'react-router-dom';
import { StyledTranslation } from './style';

interface initalQuery {
  PageIndex: number;
  PageSize: number;
  Key?: string;
  IsDeleted?: number;
}

const createModalConfig = (
  t: TFunction,
  isDelete: 'DELETE' | 'RECOVER',
  onConfirm: () => void,
  onCancel: () => void
) => ({
  isDelete,
  cancelText: t('cancel'),
  confirmText: t(isDelete === 'DELETE' ? 'delete_translation' : 'recover_translation'),
  title: t(isDelete === 'DELETE' ? 'delete_translation_title' : 'recover_translation_title'),
  content: t(isDelete === 'DELETE' ? 'delete_translation_description' : 'recover_translation_description'),
  open: true,
  onConfirm,
  onCancel,
});

export function Translations() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<initalQuery>({
    PageIndex: parseInt(searchParams.get('pageIndex') ?? '1'),
    PageSize: parseInt(searchParams.get('pageSize') ?? '10'),
  });
  const [key, setKey] = useState<string | null>(null);
  const [coniformModal, setConiformModal] = useState<any>(null);
  const [open, setOpen] = useState<{ open: boolean; type: 'ADD' | 'EDIT'; translation: any }>({
    open: false,
    type: 'ADD',
    translation: null,
  });
  const { refetch: getTranslations, data: translations } = useQueryApiClient({
    request: {
      url: '/api/multilingualtext/all/translations',
      method: 'GET',
      data: queryParams,
    },
  });
  const [form] = Form.useForm();

  // Ref to track the container (optional: for smoother control)
  const containerRef = useRef<HTMLDivElement>(null);

  // Update URL search params when pagination changes
  const updateSearchParams = useCallback((page: number, pageSize: number) => {
    setSearchParams(
      (prev) => {
        prev.set('pageIndex', page.toString());
        prev.set('pageSize', pageSize.toString());
        return prev;
      },
      { replace: true }
    );
  }, [setSearchParams]);

  const handlePaginationChange = (page: number, pageSize: number) => {
    setQueryParams((prev) => ({ ...prev, PageIndex: page, PageSize: pageSize }));
    updateSearchParams(page, pageSize);

    // Optional: Smooth scroll to top of the list (not window top)
    if (containerRef.current) {
      const headerOffset = 100; // Adjust based on your fixed header height
      const elementPosition = containerRef.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth',
      });
    } else {
      // Fallback: smooth scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFilterChange = (changedValue: any) => {
    setQueryParams((res) => ({
      ...res,
      ...changedValue,
      PageIndex: 1, // Reset to first page on filter
    }));
    updateSearchParams(1, queryParams.PageSize);
  };

  useEffect(() => {
    getTranslations();
  }, [queryParams, getTranslations]);

  const handleDelete = (type: 'DELETE' | 'RECOVER', key: string) => {
    setConiformModal(
      createModalConfig(
        t,
        type,
        () => {
          setKey(key);
        },
        () => {
          setConiformModal(null);
        }
      )
    );
  };

  const { refetch: deleteTranslation } = useQueryApiClient({
    request: {
      url: `/api/multilingualtext/delete?key=${key}`,
      method: 'DELETE',
    },
    onSuccess(res) {
      if (res.data === 'deleted') {
        Notification({ type: 'error', text: t('translation_deleted') });
      } else {
        Notification({ type: 'info', text: t('translation_recovered') });
      }
      getTranslations();
    },
  });

  useEffect(() => {
    if (key) {
      deleteTranslation();
      setConiformModal(null);
      setKey(null);
    }
  }, [key, deleteTranslation]);

  const handleClose = () => {
    setOpen({ open: false, type: 'ADD', translation: null });
    form.resetFields();
  };

  const { appendData: createTranslation, isLoading: isCreateTranslation } = useQueryApiClient({
    request: {
      url: `/api/multilingualtext/create`,
      method: 'POST',
    },
    onSuccess() {
      Notification({ type: 'success', text: t('translation_created') });
      getTranslations();
      handleClose();
    },
    onError() {
      Notification({ type: 'error', text: t('key_already_exist') });
    },
  });

  const { appendData: updateTranslation, isLoading: isUpdateTranslation } = useQueryApiClient({
    request: {
      url: `/api/multilingualtext/update`,
      method: 'PUT',
    },
    onSuccess() {
      Notification({ type: 'success', text: t('translation_updated') });
      getTranslations();
      handleClose();
    },
  });

  const handleSubmitTranslation = () => {
    form
      .validateFields()
      .then((res) => {
        res.supportLanguage = 0;
        if (open.type === 'ADD') createTranslation(res);
        else if (open.type === 'EDIT') updateTranslation(res);
      })
      .catch(() => {});
  };

  return (
    <StyledTranslation ref={containerRef}>
      <div className="header-line">
        <TranslationsFilter handleFilterChange={handleFilterChange} />
        <Button
          label={t('add_translations')}
          type="primary"
          onClick={() => setOpen({ type: 'ADD', open: true, translation: null })}
        />
      </div>
      <TranslationsList
        isCreateTranslation={isCreateTranslation}
        isUpdateTranslation={isUpdateTranslation}
        handleDelete={handleDelete}
        translations={translations?.data?.items}
        setOpen={setOpen}
      />
      <Pagination
        total={translations?.data?.totalItems}
        pageSize={translations?.data?.itemsPerPage}
        onChange={handlePaginationChange}
        hideOnSinglePage={true}
        current={translations?.data?.PageIndex}
        // Prevent default anchor behavior if Pagination uses <a> tags
        // (Some UI libraries do this — ensure onChange is used, not href)
      />

      <TranslationActionForm
        handleSubmitTranslation={handleSubmitTranslation}
        form={form}
        open={open}
        handleClose={handleClose}
      />

      {coniformModal && <ConfirmModal {...coniformModal} />}
    </StyledTranslation>
  );
}