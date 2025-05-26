import DefaultLayout from 'layouts/DefaultLayout';
import { HomePage, Login, User } from 'pages';
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
]);
