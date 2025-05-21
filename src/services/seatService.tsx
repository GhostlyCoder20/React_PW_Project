import { Data } from "../models/data"
import { SeatView } from "../models/seatView"
import api from "./api"


const seatService = {
    getHallWithSeatsView: async (): Promise<SeatView[]> => {
        const response = await api.get<Data<SeatView[]>>(`seat/`);
        return response.data.data;
    },

    saveSeat: async (data: FormData): Promise<any> => {
        const response = await api.post<Data<any>>(`seat/`, data);
        return response.data.data;
    },

    deleteSeatsByHallId:  async (idHall: number): Promise<string> => {
        const response = await api.delete<Data<string>>(`seat/seats/${idHall}`);
        return response.data.data;
    },

     getSeatByHallId:  async (idHall: number): Promise<any> => {
        const response = await api.get<Data<any>>(`seat/${idHall}`);
        return response.data.data;
    },

     getMaxRowAndColumnByHall: async (idHall: number): Promise<any> => {
        const response = await api.get<Data<any>>(`seat/seats/${idHall}`);
        return response.data.data;
    },

    updateReservationSeats: async (id: number, user_id: number): Promise<string> => {
        const response = await api.put<Data<any>>(`seat/byreservation/${id}`, {user_id});
        return response.data.data;
        
    }


}

export default seatService