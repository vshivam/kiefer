import Axios from "axios";

export const API_BASE = "127.0.0.1:3000" + "/user";
export async function getLoginRequest(email, password) {
    return Axios({
        method: "post",
        params: {
            email: email,
            password: password,
        },
        url: `${API_BASE}/login`,
        withCredentials: true
    });
}