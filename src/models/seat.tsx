export interface Seat {
    fila: string
    columna: string
    estado: number 
    id_sala: number 

}

export interface SeatDTO {
    id: number
    fila: string
    columna: string
    estado: number 
    id_sala: number
    id_usuario: number; 

}

