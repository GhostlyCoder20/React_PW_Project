import { Link } from 'react-router-dom';
import styles from './seat.module.css';
import { useEffect, useState } from 'react';
import { SeatView } from '../../../models/seatView';
import seatService from '../../../services/seatService';

const Seat: React.FC = () => {
    const [id, setId] = useState<number>(0);
    const [seat, setSeat] = useState<SeatView[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const loadHallWithSeats = async () => {
        try {
            const seatsData = await seatService.getHallWithSeatsView();
            setSeat(seatsData);
        } catch (error) {
            console.log(error);
            setError('Error al cargar las salas que tienen asientos')
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadHallWithSeats();
    }, []);

     const deleteSeats = async (e: React.FormEvent) => {
        e.preventDefault();


        try {



            const deleteMovie = await seatService.deleteSeatsByHallId(id);
            console.log(deleteMovie);
            alert(deleteMovie);

            loadHallWithSeats();

        } catch (error) {
            console.log('Error: ', error);
            alert("No se pudo eliminar los asientos")
        }
    }

    if (loading) {
        return <p>Cargando sala de Peliculas</p>

    }

    if (error) {
        return <p>{error}</p>
    }

    return (<section className={styles['seatcatalog-section']}>

        <div className={styles['seatcatalog-header']}>
            <h1 className={styles['h1pos']}>Lista de asientos</h1>

            <Link to='/admin/seat/add'>
                <button className={styles['btn-h']}>Añadir</button>
            </Link>

            <Link to='/admin'>
                <button className={styles['btn-h']}>Regresar</button>
            </Link>

        </div>

        <hr />

        <div className={styles['seatcatalog-content']}>
            <table className={styles['seatcatalog-table']}>
                <thead>
                    <tr>
                        <th>ID Sala</th>
                        <th>Numero de la sala</th>
                        <th>Numero de asientos</th>
                        <th>Acciones</th></tr>
                </thead>
                <tbody>

                    {seat.map((s) => (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.numero_sala}</td>
                            <td>{s.numero_asientos}</td>

                            <td>

                                <div className={styles['action-row']}>
                                    <Link className={styles['btn-a']} to={`/admin/seat/update/${s.id}`}>
                                        <i className='bx bx-edit'></i>
                                    </Link>
                                    <form onSubmit={deleteSeats} className={styles['form-action-delete']} >

                                        <button className={styles['btn-a']} onClick={(e) => setId(s.id)} type='submit'>
                                            <i className='bx bx-trash'></i>
                                        </button>

                                    </form>

                                </div>


                            </td>
                        </tr>
                    ))}


                </tbody>
            </table>

        </div>

    </section>);
}

export default Seat;