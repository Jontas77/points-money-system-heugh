export type RegisterPayload = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: string;
};

export type LoginInput = {
  username: string;
  password: string;
};

export type LoginPayload ={
  token: string;
  user: UserResponse;
}

export type Task = {
  _id: string;
  description: string;
  points: number;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  points: number;
  money: number;
  role: "parent" | "child";
};

export type Child = {
  _id: string;
  firstName: string;
  lastName: string;
  points: number;
  money: number;
  tasks: { id: string; description: string }[];
  pointHistory: { points: number; reason: string; date: string }[];
};

export type UserResponse = {
  id: string;
  username: string;
  role: string;
  firstName: string;
  lastName: string;
};

export type updateUserInput = {
firstName?: string;
lastName?: string;
username?: string;
password?: string;
role?: string;
};
