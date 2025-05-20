import { Data } from "../models/data"
import { RoleModel } from "../models/role"
import api from "./api"


const rolService = {
    getRols: async (): Promise<RoleModel[]> => {
        const response = await api.get<Data<RoleModel[]>>('rol/');
        return response.data.data;
    },

    getRolById: async(id: number): Promise<any> => {
        const response = await api.get<Data<RoleModel>>(`rol/${id}`);
        return response.data.data
    },

    deleteRol: async (id: number): Promise<string> => {
        const response = await api.delete<Data<string>>(`rol/${id}`);
        return response.data.data;
    },

    postRole: async (data: FormData): Promise<any> => {
        const response = await api.post<Data<any>>(`rol/`, data);
        return response.data.data;
    },

    putRole: async (id: number, data: FormData): Promise<any> => {
        const response = await api.put<Data<any>>(`rol/${id}`, data);
        return response.data.data;
    }
}

export default rolService;