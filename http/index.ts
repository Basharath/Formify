import axios, { AxiosRequestHeaders } from 'axios';
import toast from 'react-hot-toast';
import {
  UserSigninType,
  UserFormType,
  UserSignupType,
  FormSubmissionType,
} from '../types';

const baseURL = '/api';

axios.defaults.withCredentials = true;
const API = axios.create({ baseURL });

let authToken = '';

// API.interceptors.request.use((req: AxiosRequestHeaders) => {
//   // @ts-nocheck
//   req.headers.Authorization = authToken;
//   return req;
// });

API.interceptors.response.use(
  (res) => res,
  (error) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      toast.error('An unexpected error occurred');
    }
    return Promise.reject(error);
  }
);

const forms = '/forms';
const usersUrl = '/users';

export const getUserForms = () => API.get(`${forms}/manage`);
export const createUserForm = (newForm: UserFormType) =>
  API.post(forms, newForm);
export const updateUserForm = (id: string, formData: UserFormType) =>
  API.put(`${forms}/manage?${id}`, formData);
export const deleteUserForm = (id: string) =>
  API.delete(`${forms}/manage?${id}`);

export const getFormSubmissions = (userFormId: string) =>
  API.get(`${forms}/submissions?id=${userFormId}`);
export const submitForm = (userFormId: string, form: FormSubmissionType) =>
  API.post(`${forms}/submissions?id=${userFormId}`, form);
export const deleteFormSubmission = (submissionId: string) =>
  API.delete(`${forms}/submissions?id=${submissionId}`);

export const getUser = () => API.get(`${usersUrl}/getuser`);
export const signin = (userData: UserSigninType) =>
  API.post(`${usersUrl}/signin`, userData);
export const signup = (userData: UserSignupType) =>
  API.post(`${usersUrl}/signup`, userData);
export const signout = () => API.post(`${usersUrl}/signout`);
// export const changePass = (userData: any) =>
//   API.post(`${usersUrl}/changepassword`, userData);
