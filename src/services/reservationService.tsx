import api from "./api";


const reservationService = {
    postReservation: async (data: FormData) => {
        const response = await api.post<any>(`reservation/`,data);
        console.log('aqui');
        return response.data;
    }
}

export default reservationService;