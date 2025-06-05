import DefaultLayout from 'layouts/DefaultLayout';
import { Login, Room, Team, Translations, User } from 'pages';
import { Home } from 'pages/HomePage';
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
          <Home />
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
    path: '/setting/rooms',
    element: (
      <ProtectedUserRoute>
        <DefaultLayout title="rooms_setting">
          <Room />
        </DefaultLayout>
      </ProtectedUserRoute>
    ),
  },
  {
    path: '/setting/teams',
    element: (
      <ProtectedUserRoute>
        <DefaultLayout title="teams_setting">
          <Team />
        </DefaultLayout>
      </ProtectedUserRoute>
    ),
  },
  {
    path: '/setting/translations',
    element: (
      <ProtectedUserRoute>
        <DefaultLayout title="translations_setting">
          <Translations />
        </DefaultLayout>
      </ProtectedUserRoute>
    ),
  },
]);
