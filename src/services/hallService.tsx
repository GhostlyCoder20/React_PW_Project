import { Data } from "../models/data";
import { HallModel } from "../models/hall";
import { MovieHall } from "../models/moviehall";
import api from "./api";


const hallService = {
    getHallById: async (id: number): Promise<any> => {
        const response = await api.get<Data<MovieHall>>(`hall/${id}`);
        return response.data.data;
    },

    getAllHalls: async (): Promise<HallModel[]> => {
        const response = await api.get<Data<HallModel[]>>('hall/');
        return response.data.data;
    }
}

export default hallService;