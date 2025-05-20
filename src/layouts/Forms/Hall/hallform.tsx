import React, { useEffect, useState } from "react";
import { MovieModel } from "../../../models/Movie";
import style from "./hallform.module.css";
import movieService from "../../../services/movieService";
import movieHallService from "../../../services/movieHallService";
import { useParams } from "react-router-dom";
import hallService from "../../../services/hallService";


const HallForm: React.FC = () => {
    const { id } = useParams() as { id: string };
    const [movies, setMovies] = useState<MovieModel[]>([]);

    const [movie, setMovie] = useState<number>(0);
    const [numerosala, setNumeroSala] = useState<number>(0);
    const [fecha, setFecha] = useState<Date>(new Date());

    const loadMovies = async () => {
        try {
            const movieData = await movieService.getMovies();
            setMovies(movieData);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(e.target.value);
        setFecha(newDate);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (id !== undefined) {

            const formData = new FormData();

            formData.append('numero_sala', numerosala.toString());
            formData.append('fecha', fecha?.toISOString());
            formData.append('id_pelicula', movie.toString());

            try {
                const updateMovieHall = movieHallService.updateMovieHall(Number(id), formData);
                alert(updateMovieHall);
            } catch (error) {
                console.log(error);
                alert("No se puede actualizar la sala y la pelicula")
            }


        } else {

            const formData = new FormData();

            formData.append('numero_sala', numerosala.toString());
            formData.append('fecha', fecha?.toISOString());
            formData.append('id_pelicula', movie.toString());

            try {
                const addMovieHall = movieHallService.postMovieHall(formData);
                alert(addMovieHall);
            } catch (error) {
                console.log(error);
                alert("No se puede añadir la sala y la pelicula")
            }

        }



    }




    useEffect(() => {
        loadMovies();

        const loadData = async () => {
            try {

                if (id !== undefined) {


                    const movieHallValues = await movieHallService.getMovieHallById(Number(id));
                    //Pelicula 
                    setMovie(movieHallValues[0].id_pelicula);
                    //Fecha
                    const dataDate = movieHallValues[0].fecha;
                    const date = new Date(dataDate);
                    setFecha(date);
                    //Numero de sala
                    const hall = await hallService.getHallById(movieHallValues[0].id_sala);
                    setNumeroSala(hall[0].numero_sala);
                }
            } catch (error) {
                console.log('Error: ', error);
                alert("No se pudo cargar la pelicula especifica")
            }
        };

        loadData();
    }, [id]);


    return (<section className={style['hall-form-section']}>
        <div className={style["hall-form-container"]}>
            <h1 className={style["hall-form-title"]}>Formulario de Salas</h1>
            <form onSubmit={handleSubmit} className={style['hall-form-form']}>
                <div className={style["hall-form-group"]}>
                    <span>Numero: </span>
                    <input type="number" value={numerosala} onChange={(e) => setNumeroSala(Number(e.target.value))} />
                </div>

                <div className={style["hall-form-group"]}>
                    <span>Fecha: </span>
                    <input type="date" onChange={handleDate} value={fecha ? fecha.toISOString().split('T')[0] : ''} />
                </div>
                <div className={style["hall-form-group"]}>
                    <span>Pelicula: </span>
                    <select value={movie} onChange={(e) => setMovie(Number(e.target.value))}>
                        <option value="">Seleccionar Pelicula</option>
                        {movies.map((movie) => (
                            <option key={movie.id} value={movie.id}>{movie.nombre}</option>
                        ))}

                    </select>
                </div>
                <div className={style["hall-form-group"]}>

                </div>
                <div className={style['half-form-button']}>
                    <input type="submit" value="Registrar" />
                </div>
                <div className={style['half-form-button']}>
                    <input type="button" value="Regresar" />
                </div>
            </form>
        </div>
    </section>)
}

export default HallForm;