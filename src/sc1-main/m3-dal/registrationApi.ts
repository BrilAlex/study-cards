import {instance} from "./instance";

// Types
type ResponseType = {
  error: string
}

export const registrationAPI = {
  register(email: string, password: string) {
    return instance.post<ResponseType>("auth/register", {email, password});
  },
};
