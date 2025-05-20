import axios from "axios";
import { Data } from "../models/data";
import api from "./api"


const loginService = {

    getTokenData: async (token: string): Promise<any> => {
        try {
            const response = await api.get<any>('user/data', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
          
            return response.data.user.data[0];
        } catch (error) {
             if (axios.isAxiosError(error)) {
                const status = error.response?.status;

                if (status === 401) {
                    return status;
                }
            }
        }
    },

    postLogin: async (data: FormData): Promise<any> => {

        try {

            const response = await api.post<any>('user/login', data);
            sessionStorage.setItem('auth-token', response.data.data.token);

            return response.data;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;

                if (status === 404) {
                    return status;
                }
            }
        }

    },

    postRegister: async (data: FormData): Promise<any> => {
        try {

            const response = await api.post<any>('user/register', data);

            return response.data;

        } catch (error) {
            console.log('Error desde postRegister: ', error);
        }
    }
}

export default loginService;