import { Link } from 'react-router-dom';
import styles from './hall.module.css';
import React, { useEffect, useState } from 'react';
import { MovieHallView } from '../../../models/MovieHallView';
import movieHallService from '../../../services/movieHallService';


const Hall: React.FC = () => {
     const [id, setId] = useState<number>(0);

    const [movieHall, setMovieHall] = useState<MovieHallView[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadMovieHalls = async () => {
        try {
            const movieHallData = await movieHallService.getMovieHallView();
            setMovieHall(movieHallData);
        } catch (error) {
            console.log(error);
            setError('Error al cargar las salas y sus peliculas')
        } finally {
            setLoading(false);
        }
    }

    const deleteMovieHall = async (e:React.FormEvent) => {
        e.preventDefault();

        try {
            const deleteMovieHall = await movieHallService.deleteMovieHall(id);
            alert(deleteMovieHall);
            
            loadMovieHalls();
        } catch (error) {
            console.log("Error: ", error);
            alert("No se puedo eliminar la sala")
        }
    }

    

    useEffect(() => {
        loadMovieHalls();
    }, [])

    if (loading) {
        return <p>Cargando sala de Peliculas</p>
        
    }

    if (error) {
        return <p>{error}</p>
    }

    return (<section className={styles['hallcatalog-section']}>

        <div className={styles['hallcatalog-header']}>
            <h1 className={styles['h1pos']}>Lista de salas</h1>

            <Link to='/admin/hall/add'>
                <button className={styles['btn-h']}>Añadir</button>
            </Link>

            <Link to='/admin'>
                <button className={styles['btn-h']}>Regresar</button>
            </Link>

        </div>

        <hr />

        <div className={styles['hallcatalog-content']}>
            <table className={styles['moviehallcatalog-table']}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre Pelicula</th>
                        <th>Numero Sala</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {movieHall.map((movie) => (
                        <tr key={movie.id}>
                            <td>{movie.id}</td>
                            <td>{movie.nombre}</td>
                            <td>{movie.numero_sala}</td>
                            <td>{movie.fecha.toString()}</td>

                            <td>
                                <div className={styles['action-row']}>
                                    <Link className={styles['btn-a']} to={`/admin/hall/update/${movie.id}`}>
                                        <i className='bx bx-edit'></i>
                                    </Link>
                                    <form className={styles['form-action-delete']} onSubmit={deleteMovieHall}>
                                       
                                           <button  className={styles['btn-a']} onClick={(e) => setId(movie.id)}   type='submit'>
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

export default Hall;