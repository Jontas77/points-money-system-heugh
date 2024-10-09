import axios from "axios";
import { LoginInput, RegisterPayload, updateUserInput } from "../types";
console.log(import.meta.env.VITE_API_BASE_URL);
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const register = (input: RegisterPayload) =>
  api.post("/auth/register", input);

export const login = (data: LoginInput) => api.post("/auth/login", data);

export const createTask = (
  description: string,
  points: number,
  userId: string
) => api.post("/tasks", { description, points, userId });

export const getTasks = (userId: string) => api.get(`/tasks/${userId}`);

// New API calls for users
export const getAllUsers = () => api.get("/users/all");

export const getUserById = (id: string) => api.get(`/users/${id}`);

export const getAllChildren = () => api.get("/users/children/all");

export const getChildById = (id: string) => api.get(`/users/children/${id}`);

export const getAllParents = () => api.get("/users/parents/all");

export const updatePointsAndMoney = (
  childId: string,
  points: number,
  money: number,
  reason: string
) => {
  return api.post("/users/update-points-money", {
    childId,
    points,
    money,
    reason,
  });
};

export const updateUser = (userId: string, input: updateUserInput) => {
  return api.put(`/users/${userId}`, input);
};

// const baseURL = "http://localhost:4002";

// const handleResponse = async (response: Response) => {
//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Something went wrong');
//   }
//   return response.json();
// };

// export const register = async (input: RegisterPayload) => {
//   const response = await fetch(`${baseURL}/auth/register`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(input),
//   });
//   return handleResponse(response);
// };

// export const login = async (data: LoginInput) => {
//   const response = await fetch(`${baseURL}/auth/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });
//   return handleResponse(response);
// };

// export const createTask = async (
//   description: string,
//   points: number,
//   userId: string
// ) => {
//   const response = await fetch(`${baseURL}/tasks`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ description, points, userId }),
//   });
//   return handleResponse(response);
// };

// export const getTasks = async (userId: string) => {
//   const response = await fetch(`${baseURL}/tasks/${userId}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   return handleResponse(response);
// };

// export const getAllUsers = async () => {
//   const response = await fetch(`${baseURL}/users/all`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   return handleResponse(response);
// };

// export const getUserById = async (id: string) => {
//   const response = await fetch(`${baseURL}/users/${id}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   return handleResponse(response);
// };

// export const getAllChildren = async () => {
//   const response = await fetch(`${baseURL}/users/children/all`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   return handleResponse(response);
// };

// export const getChildById = async (id: string) => {
//   const response = await fetch(`${baseURL}/users/children/${id}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   return handleResponse(response);
// };

// export const getAllParents = async () => {
//   const response = await fetch(`${baseURL}/users/parents/all`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   return handleResponse(response);
// };

// export const updatePointsAndMoney = async (
//   childId: string,
//   points: number,
//   money: number,
//   reason: string
// ) => {
//   const response = await fetch(`${baseURL}/users/update-points-money`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ childId, points, money, reason }),
//   });
//   return handleResponse(response);
// };

// export const updateUser = async (userId: string, input: updateUserInput) => {
//   const response = await fetch(`${baseURL}/users/${userId}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(input),
//   });
//   return handleResponse(response);
// };