import DefaultLayout from 'layouts/DefaultLayout';
import { HomePage, Login, Translations, User } from 'pages';
import { Translation } from 'react-i18next';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedUserRoute from 'routes/ProtectedUserRoutes';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/',
    element: (
      <ProtectedUserRoute>
        <DefaultLayout title="dashboard">
          <HomePage />
        </DefaultLayout>
      </ProtectedUserRoute>
    ),
  },
  {
    path: '/setting/users',
    element: (
      <ProtectedUserRoute>
        <DefaultLayout title="users_setting">
          <User />
        </DefaultLayout>
      </ProtectedUserRoute>
    ),
  },
  {
    path: '/setting/translations',
    element: (
      <ProtectedUserRoute>
        <DefaultLayout title="translation_setting">
          <Translations />
        </DefaultLayout>
      </ProtectedUserRoute>
    ),
  },
]);
