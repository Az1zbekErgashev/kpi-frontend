// import { useEffect, useState } from 'react';
// import useQueryApiClient from 'utils/useQueryApiClient';

// interface QueryParams {
//   [key: string]: any; 
// }

// interface Translation {
//   key: string;
//   textKo: string;
//   textEn: string;
//   isDeleted: number;
// }

// export function useTranslations() {
//   const [queryParams, setQueryParams] = useState<QueryParams | null>(null);
//   const [translationKey, setTranslationKey] = useState<number | null>(null);

//   const { appendData: createTranslation, isLoading: isCreateTranslation } = useQueryApiClient({
//     request: {
//       url: `/api/multilingualtext/create`,
//       method: 'POST',
//     },
//     onSuccess() {
//       refetchTranslations();
//     },
//   });

//   const { refetch: deleteTranslation } = useQueryApiClient({
//     request: {
//       url: `/api/multilingualtext/delete?key=${translationKey}`,
//       method: 'DELETE',
//     },
//     onSuccess() {
//       refetchTranslations();
//     },
//   });

//   const { appendData: updateTranslation, isLoading: isUpdateTranslation } = useQueryApiClient({
//     request: {
//       url: `/api/multilingualtext/update`,
//       method: 'PUT',
//     },
//     onSuccess() {
//       refetchTranslations();
//     },
//   });

//   const { data: translations, refetch: refetchTranslations } = useQueryApiClient({
//     request: {
//       url: `/api/multilingualtext`,
//       method: 'GET',
//       data: queryParams,
//       disableOnMount: true,
//     },
//   });

//   const { refetch: getTranslations, data: allTranslations } = useQueryApiClient({
//     request: {
//       url: '/api/multilingualtext/all/translations',
//       method: 'GET',
//       data: queryParams,
//     },
//   });

//   const handleDelete = (translationId: number | null) => {
//     setTranslationKey(translationId);
//   };

//   useEffect(() => {
//     if (queryParams !== null) {
//       refetchTranslations();
//     }
//   }, [queryParams, refetchTranslations]);

//   useEffect(() => {
//     if (translationKey !== null) {
//       deleteTranslation();
//     }
//   }, [translationKey, deleteTranslation]);

//   return {
//     createTranslation,
//     updateTranslation,
//     translations,
//     refetchTranslations,
//     setQueryParams,
//     handleDelete,
//     isCreateTranslation,
//     isUpdateTranslation,
//     getTranslations,
//     allTranslations,
//   };
// }