import DefaultLayout from 'layouts/DefaultLayout';
import {
  HomePage,
  Login,
  Room,
  Team,
  TeamLeaders,
  Translations,
  User,
  GoalPage,
  YearlyGoal,
  GradeDisplay,
  MonthlyTarget,
  ScoreManagement,
  Profile,
} from 'pages';
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
        <DefaultLayout title="team_leaders">
          <TeamLeaders />
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
    path: '/profile',
    element: (
      <ProtectedUserRoute>
        <DefaultLayout title="user_profile">
          <Profile />
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
    path: '/goal/user-id/:id/:year',
    element: (
      <ProtectedUserRoute>
        <DefaultLayout title="goal_setting">
          <GoalPage />
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
  {
    path: '/setting/yearly-goal',
    element: (
      <ProtectedUserRoute>
        <DefaultLayout title="yearl_goal_title">
          <YearlyGoal />
        </DefaultLayout>
      </ProtectedUserRoute>
    ),
  },
  {
    path: '/evaluation',
    element: (
      <ProtectedUserRoute>
        <DefaultLayout title="yearly_evaluation">
          <GradeDisplay />
        </DefaultLayout>
      </ProtectedUserRoute>
    ),
  },
  {
    path: '/setting/score-management',
    element: (
      <ProtectedUserRoute>
        <DefaultLayout title="score_management">
          <ScoreManagement />
        </DefaultLayout>
      </ProtectedUserRoute>
    ),
  },
  {
    path: '/monthly-target/:id/:year/:month',
    element: (
      <ProtectedUserRoute>
        <DefaultLayout title="monthly_target">
          <MonthlyTarget />
        </DefaultLayout>
      </ProtectedUserRoute>
    ),
  },
]);
