import { useState } from 'react';
import useQueryApiClient from 'utils/useQueryApiClient';

interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  userName: string;
  fullName: string;
  role: 'Ceo' | 'Director' | 'TeamLead' | 'TeamMember';
  teamId: number;
  roomId: number;
  team: string;
  room: string;
  isDeleted: number;
}

interface FilterInitialQuery {
  Year?: string;
  RoomId?: number;
  TeamId?: number;
  UserName?: string;
  PageIndex: number;
  PageSize: number;
}

interface ApiResponse {
  status: boolean;
  error: string;
  data: User[];
  global: boolean;
}

export function useHome() {
  const [queryParams, setQueryParams] = useState<FilterInitialQuery>({
    PageIndex: 1,
    PageSize: 10,
  });

  const { data: usersResponse, isLoading, isError, refetch } = useQueryApiClient({
    request: {
      url: `/api/user/filter-ceo`,
      method: 'GET',
      params: queryParams,
    },
  });

  return {
    users: usersResponse?.data || [],
    isLoading,
    isError,
    setQueryParams,
    refetchUsers: refetch,
  };
}