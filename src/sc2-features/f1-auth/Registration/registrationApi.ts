import axios from "axios";

// Types
export type RegisterUserData = {
  email: string
  password: string
};
type ResponseType = {
  error?: string
}

// Axios instance
const instance = axios.create({
  baseURL: "http://localhost:7542/2.0/",
  withCredentials: true,
});

export const authRegistrationAPI = {
  register(userData: RegisterUserData) {
    return instance.post<ResponseType>("auth/register", userData);
  },
};
