import { Data } from "../models/data";
import { MovieHall } from "../models/moviehall";
import { MovieHallView } from "../models/MovieHallView";
import api from "./api";

const movieHallService = {
    getMovieHallView: async () : Promise<MovieHallView[]> => {
        const response = await api.get<Data<MovieHallView[]>>('movieHall/');
        return response.data.data;
    },

    deleteMovieHall: async (id: number): Promise<string> => {
        const response = await api.delete<Data<string>>(`movieHall/${id}`);
        console.log(response.data.data);
        return response.data.data;
    },


    getMovieHallById: async (id: number): Promise<any> => {
        const response = await api.get<Data<MovieHall>>(`movieHall/${id}`);
        return response.data.data;
    },

     getHallByMovieId: async (id: number): Promise<any> => {
        const response = await api.get<Data<string>>(`movieHall/hall/${id}`);
        return response.data.data;
    },
    

    postMovieHall: async (movieHall: FormData) : Promise<string> => {
        const response = await api.post<Data<string>>(`movieHall/`, movieHall);

        return response.data.data;
    },

    updateMovieHall: async (id:number, moviehall: FormData) => {
        const response = await api.put<Data<string>>(`movieHall/${id}`, moviehall);

        return response.data.data;
    }
}




export default movieHallService;