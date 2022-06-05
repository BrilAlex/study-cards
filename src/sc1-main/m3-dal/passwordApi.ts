import { instance } from "./instance";


// Types
type ResponseType = {
    info: string
    error: string | null
    success: false
}

export const passwordAPI = {
    forgot(email: string, message: string) {
        return instance.post<ResponseType>("auth/forgot", {email, message});
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post<ResponseType>("auth/set-new-password", {password, resetPasswordToken});
    },
};
