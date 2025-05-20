
import { Data } from "../models/data";
import { MovieModel } from "../models/Movie";
import api from "./api";


const movieService = {
    getMovies: async () : Promise<MovieModel[]> => {
        const response = await api.get<Data<MovieModel[]>>('movie/');
        return response.data.data;
    },

    postMovies: async (movie: FormData) : Promise<string> => {
        const response = await api.post<Data<string>>('movie/', movie, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data.data;
    },

    getMovieById: async (id: number) : Promise<any> => {
        const response = await api.get<Data<MovieModel>>(`movie/${id}`);
        return response.data.data;
    },

    putMovie: async (id: number, data: FormData): Promise<string> => {
        const response =  await api.put<Data<string>>(`movie/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data.data;
    },

    deleteMovie: async (id: number) : Promise<string> => {
        console.log(typeof(id));
        const response = await api.delete<Data<string>>(`movie/${id}`);
        return response.data.data;
    },

    
}

export default movieService;