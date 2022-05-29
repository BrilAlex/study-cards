import axios from "axios";

// Types
type ResponseType = {
  error: string
}

// Axios instance
const instance = axios.create({
  baseURL: "http://localhost:7542/2.0/",
  withCredentials: true,
});

export const authRegistrationAPI = {
  register(email: string, password: string) {
    return instance.post<ResponseType>("auth/register", {email, password});
  },
};
