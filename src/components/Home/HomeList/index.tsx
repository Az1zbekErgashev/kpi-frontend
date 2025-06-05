import React from 'react';
import { StyledHomeList } from './style';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { Button, Input, Select, SelectOption, Table } from 'ui';
import { Form } from 'antd';
import dayjs from 'dayjs';
import SvgSelector from 'assets/icons/SvgSelector';
import Tooltip from 'antd/lib/tooltip';

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

interface Room {
  id: number;
  createdAt: string;
  name: string;
  teamsCount: number;
  isDeleted: number;
}

interface Team {
  id: number;
  name: string;
}

interface FilterQuery {
  Year?: string;
  RoomId?: number;
  TeamId?: number;
  UserName?: string;
  PageIndex: number;
  PageSize: number;
}

interface Props {
  users: User[];
  rooms: Room[];
  teams: Team[];
  setActionModalConfig: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      type: 'ADD' | 'EDIT' | 'VIEW';
      user?: User;
      title: string;
      handleClose: () => void;
      handleCreateUser: (data: {
        fullName: string;
        userName: string;
        password: string;
        role: 'Ceo' | 'Director' | 'TeamLead' | 'TeamMember';
        teamId: number;
        roomId: number;
      }) => Promise<void>;
      handleUpdateUser: (data: {
        id: number;
        fullName: string;
        userName: string;
        role: 'Ceo' | 'Director' | 'TeamLead' | 'TeamMember';
        teamId: number;
        roomId: number;
      }) => Promise<void>;
      roomData: Room[];
      teamData: Team[];
      setQueryParams: React.Dispatch<React.SetStateAction<FilterQuery>>;
    }>
  >;
  filterQuery: FilterQuery;
  setFilterQuery: React.Dispatch<React.SetStateAction<FilterQuery>>;
  handleCreateUser: (data: {
    fullName: string;
    userName: string;
    password: string;
    role: 'Ceo' | 'Director' | 'TeamLead' | 'TeamMember';
    teamId: number;
    roomId: number;
  }) => Promise<void>;
  handleUpdateUser: (data: {
    id: number;
    fullName: string;
    userName: string;
    role: 'Ceo' | 'Director' | 'TeamLead' | 'TeamMember';
    teamId: number;
    roomId: number;
  }) => Promise<void>;
  handleClose: () => void;
}

export function HomeList({
  users,
  rooms,
  teams,
  setActionModalConfig,
  filterQuery,
  setFilterQuery,
  handleCreateUser,
  handleUpdateUser,
  handleClose,
}: Props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleFilterChange = (values: Partial<FilterQuery>) => {
    setFilterQuery({ ...filterQuery, ...values, PageIndex: 1 });
  };

  const handleTableChange = (pagination: any) => {
    setFilterQuery({ ...filterQuery, PageIndex: pagination.current, PageSize: pagination.pageSize });
  };

  const columns: ColumnsType<User> = [
    {
      title: t('user_name'),
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: t('full_name'),
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: t('created_at'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => dayjs(date).format('YYYY.MM.DD'),
    },
    {
      title: t('role'),
      dataIndex: 'role',
      key: 'role',
      render: (role) => t(role.toLowerCase()),
    },
    {
      title: t('team'),
      dataIndex: 'team',
      key: 'team',
    },
    {
      title: t('room'),
      dataIndex: 'room',
      key: 'room',
    },
    {
      title: t('status'),
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (isDeleted) => (
        <div className="status">
          {isDeleted === 1 ? (
            <div className="inactive_status">
              <div className="span"></div>
              {t('inactive')}
            </div>
          ) : (
            <div className="active_status">
              <div className="span"></div>
              {t('active')}
            </div>
          )}
        </div>
      ),
    },
    {
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <div className="action-btn-wrap">
          <div className="action-btn">
            <Tooltip color="#151a2d" placement="top" title={t('update_user')}>
              <Button
                icon={<SvgSelector id="edit" />}
                onClick={() =>
                  setActionModalConfig({
                    open: true,
                    title: t('edit_user'),
                    type: 'EDIT',
                    user: record,
                    handleClose,
                    handleCreateUser,
                    handleUpdateUser,
                    roomData: rooms,
                    teamData: teams,
                    setQueryParams: setFilterQuery,
                  })
                }
              />
            </Tooltip>
            <Tooltip color="#151a2d" placement="top" title={t('view_user')}>
              <Button
                icon={<SvgSelector id="view" />}
                onClick={() =>
                  setActionModalConfig({
                    open: true,
                    title: t('view_user'),
                    type: 'VIEW',
                    user: record,
                    handleClose,
                    handleCreateUser,
                    handleUpdateUser,
                    roomData: rooms,
                    teamData: teams,
                    setQueryParams: setFilterQuery,
                  })
                }
              />
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];

  return (
    <StyledHomeList>
      <Form form={form} onFinish={handleFilterChange} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item name="UserName" label={t('user_name')}>
          <Input placeholder={t('enter_user_name')} />
        </Form.Item>
        <Form.Item name="Year" label={t('year')}>
          <Input placeholder={t('enter_year')} />
        </Form.Item>
        <Form.Item name="TeamId" label={t('team')}>
          <Select placeholder={t('select_team')} allowClear>
            {teams.map((team) => (
              <SelectOption key={team.id} value={team.id}>
                {team.name}
              </SelectOption>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="RoomId" label={t('room')}>
          <Select placeholder={t('select_room')} allowClear>
            {rooms.map((room) => (
              <SelectOption key={room.id} value={room.id}>
                {room.name}
              </SelectOption>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit"
        label={t('filter')}
        />
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        dataSource={users || []}
        pagination={{
          current: filterQuery.PageIndex,
          pageSize: filterQuery.PageSize,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
        rowKey="id"
      />
    </StyledHomeList>
  );
}