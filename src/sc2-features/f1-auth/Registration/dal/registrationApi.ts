import {instance} from "../../../../sc1-main/m3-dal/instance";

// Types
type ResponseType = {
  error: string
}

export const registrationAPI = {
  register(email: string, password: string) {
    return instance.post<ResponseType>("auth/register", {email, password});
  },
};
