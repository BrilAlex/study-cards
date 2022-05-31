import {instance} from "../../../../sc1-main/m3-dal/instance";

// Types
type ResponseType = {
    info: string
    error: string
}

export const passwordAPI = {
    forgot(email: string, message: string) {
        return instance.post<ResponseType>("auth/forgot", {email, message});
    },
};
