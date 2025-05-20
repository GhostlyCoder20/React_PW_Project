import React, { useEffect, useState } from 'react';
import style from './seatform.module.css'
import { MovieHall } from '../../../models/moviehall';
import { MovieHallView } from '../../../models/MovieHallView';
import hallService from '../../../services/hallService';
import { HallModel } from '../../../models/hall';
import { Seat } from '../../../models/seat';
import seatService from '../../../services/seatService';
import { Link, useParams } from 'react-router-dom';


const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G',
    'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U',
    'V', 'W', 'X', 'Y', 'Z'
];

const SeatForm: React.FC = () => {
     const { id } = useParams() as { id: string };
    const [hall, setHall] = useState<number>(0);
    const [halls, setHalls] = useState<HallModel[]>([]);
    const seats: Seat[] = [];
    const [numRows, setNumRows] = useState<number>(1);
    const [numColumns, setNumColumns] = useState<number>(1);

    const loadSeats = async (idHall: number) => {
        try {
            const rowAndColumn = await seatService.getMaxRowAndColumnByHall(idHall);
            setHall(idHall);
            const row = alphabet.indexOf(rowAndColumn[0].max_fila);
            setNumRows(row + 1);
            setNumColumns(rowAndColumn[0].max_columna);
        } catch (error) {
            console.log(error);
        }
    }

    const loadHalls = async () => {
        try {
            const hallData = await hallService.getAllHalls();
            setHalls(hallData);
        } catch (error) {
            console.log(error);
        }
    }
    const generateTable = () => {
        const rows = [];
        for (let r = 1; r <= numRows; r++) {
            const letterRow = alphabet[r - 1];
            const cells = [];
            for (let c = 1; c <= numColumns; c++) {
                cells.push(
                    <td key={`${letterRow}-${c}`}>
                        <div className={style["cine-icon"]}>
                            <img src="/cinema-chair-svgrepo-com.svg" alt="Chair" />
                            <span className={style["number"]}>{`${letterRow}-${c}`}</span>
                        </div>
                    </td>
                );

                seats.push({
                    fila: letterRow,
                    columna: c.toString(),
                    id_sala: hall,
                    estado: 1
                });
            }
            rows.push(<tr key={r}>{cells}</tr>);


        }

        return <table>{rows}</table>;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (id !== undefined) {

            seatService.deleteSeatsByHallId(Number(id));

            seats.forEach((seat) => {
            const formData = new FormData();

            formData.append('fila', seat.fila);
            formData.append('columna', seat.columna);
            formData.append('estado', seat.estado.toString());
            formData.append('id_sala', seat.id_sala.toString());

            try {
                const saveSeats =  seatService.saveSeat(formData);
                
            } catch (error) {
                console.log(error);
                alert("No se puede actualizar la sala y la pelicula")
            }

        })
            


            
        } else {

            seats.forEach((seat) => {
            const formData = new FormData();

            formData.append('fila', seat.fila);
            formData.append('columna', seat.columna);
            formData.append('estado', seat.estado.toString());
            formData.append('id_sala', seat.id_sala.toString());

            try {
                const saveSeats =  seatService.saveSeat(formData);
                
            } catch (error) {
                console.log(error);
                alert("No se puede actualizar la sala y la pelicula")
            }

        });
            
        }

      



    }

    useEffect(() => {
        loadHalls();

        if (id !== undefined) {
            loadSeats(Number(id));
        }
      
    }, [id])



    return (<section className={style['seat-form-section']}>
        <div className={style["seat-form-container"]}>
            <h1 className={style["seat-form-title"]}>Formulario de asientos</h1>
            <form onSubmit={handleSubmit} className={style['seat-form-form']} >
                <div className={style["seat-form-group"]}>
                    <span>Sala: </span>
                    <select value={hall} onChange={(e) => setHall(Number(e.target.value))}>
                        <option>Seleccionar Sala</option>
                        {halls.map((hall) => (
                            <option key={hall.id} value={hall.id}>{hall.numero_sala}</option>
                        ))}


                    </select>
                </div>



                <div className={style["seat-form-group"]}></div>

                <div className={style["seat-form-group"]}>
                    <span>Filas: </span>
                    <input type="number" value={numRows} onChange={(e) => setNumRows(Number(e.target.value))} />
                </div>
                <div className={style["seat-form-group"]}>
                    <span>Columnas: </span>
                    <input type="number" value={numColumns} onChange={(e) => setNumColumns(Number(e.target.value))} />
                </div>
                <div className={style["seats-form-group"]}>
                    <span>Asientos: </span>
                    <div className={style["seat-form-container"]}>
                        <div id='container-table'>
                            {generateTable()}
                        </div>
                    </div>
                </div>
                <div className={style['seat-form-button']}>
                    <input type="submit" value="Registrar" />
                </div>

                <div className={style['seat-form-button']}>
                    <Link to='/admin/seat'>
                    <input type="button"  value="Regresar" /></Link>
                    
                </div>

            </form>
        </div>
    </section>)
}

export default SeatForm;