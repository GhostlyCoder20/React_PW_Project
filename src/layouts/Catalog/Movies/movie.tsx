import React, { useEffect, useState } from 'react'
import movieService from '../../../services/movieService';
import { MovieModel } from '../../../models/Movie';
import styles from './movie.module.css';
import { Link } from 'react-router-dom';


const Movie: React.FC = () => {
    const [id, setId] = useState<number>(0);
    const [movies, setMovies] = useState<MovieModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadMovies = async () => {
        try {
            const movieData = await movieService.getMovies();
            setMovies(movieData);

            console.log(movieData);

        } catch (error) {
            console.log(error);
            setError('Error al cargar las peliculas')
        } finally {
            setLoading(false);
        }
    };

    const deleteMovie = async (e: React.FormEvent) => {
        e.preventDefault();


        try {



            const deleteMovie = movieService.deleteMovie(id);
            console.log(deleteMovie);
            alert(deleteMovie);

            loadMovies();

        } catch (error) {
            console.log('Error: ', error);
            alert("No se pudo eliminar la pelicula")
        }
    }

    useEffect(() => {


        loadMovies();


    }, []);

    if (loading) {
        return <p>Cargando peliculas...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (<section className={styles['moviecatalog-section']}>

        <div className={styles['moviecatalog-header']}>
            <h1 className={styles['h1pos']}>Lista de peliculas</h1>

            <Link to='/admin/movie/add'>
                <button className={styles['btn-h']}>Añadir</button>
            </Link>

            <Link to='/admin'>
                <button className={styles['btn-h']}>Regresar</button>
            </Link>

        </div>

        <hr />

        <div className={styles['moviecatalog-content']}>
            <table className={styles['moviecatalog-table']}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Clasificacion</th>
                        <th>Duracion</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.id}>
                            <td>{movie.id}</td>
                            <td>{movie.nombre}</td>
                            <td>{movie.clasificacion}</td>
                            <td>{movie.duracion}</td>
                            <td>{movie.estado}</td>
                            <td>
                                <div className={styles['action-row']}>
                                    <Link className={styles['btn-a']} to={`/admin/movie/update/${movie.id}`}>
                                        <i className='bx bx-edit'></i>
                                    </Link>
                                    <form className={styles['form-action-delete']} onSubmit={deleteMovie}>
                                       
                                           <button  className={styles['btn-a']} onClick={(e) => setId(movie.id)} type='submit'>
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
    </section>)


};

export default Movie;