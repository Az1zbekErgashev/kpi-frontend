export interface User {
  Id: number;
  role: string;
  UserName: string;
  FullName: string;
  TeamId?: number;
}

interface TargetValue {
  type: string;
  status: string;
  valueRatio: number;
  valueNumber: number;
  valueText: string;
  evaluationText: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: number;
}

interface Goal {
  goalContent: string;
  targetValue: TargetValue;
  id: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: number;
}

interface Division {
  name: string;
  description: string;
  ratio: number;
  goals: Goal[];
  id: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: number;
}

interface Comment {
  content: string;
  status: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: number;
}

interface CreatedBy {
  id: number;
  createdAt: string;
  updatedAt: string;
  userName: string;
  fullName: string;
  role: string;
  isDeleted: number;
  room: string;
}

export interface ApiData {
  divisions: Division[];
  comments: Comment[];
  createdById: number;
  createdBy: CreatedBy;
  status: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: number;
}
