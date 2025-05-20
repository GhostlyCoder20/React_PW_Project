import { ChangeEvent, useEffect, useState } from "react";
import movieService from "../../../services/movieService";
import { useParams } from "react-router-dom";
import style from "./movieform.module.css";



const MovieForm: React.FC = () => {

    const { id } = useParams() as { id: string };

    const [nombre, setNombre] = useState("");
    const [clasificacion, setClasificacion] = useState("");
    const [duracion, setDuracion] = useState(0);
    const [sinopsis, setSinopsis] = useState("");
    const [estado, setEstado] = useState<boolean>(false);
    const [imagen, setImagen] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);


    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file);
        if (file) {
            setImagen(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEstado(e.target.checked);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (id !== undefined) {
            const formData = new FormData();


            formData.append('nombre', nombre);
            formData.append('sinopsis', sinopsis);
            formData.append('clasificacion', clasificacion);
            formData.append('duracion', duracion.toString());
            formData.append('estado', estado.toString());
            if (imagen) {
                formData.append('imagen', imagen);
            }



            try {

                const updateMovie = movieService.putMovie(Number(id), formData);
                console.log(updateMovie);
                alert(updateMovie);
            } catch (error) {
                console.log('Error: ', error);
                alert("No se pudo actualizar el usuario")
            }
        } else {

            const formData = new FormData();


            formData.append('nombre', nombre);
            formData.append('sinopsis', sinopsis);
            formData.append('clasificacion', clasificacion);
            formData.append('duracion', duracion.toString());
            formData.append('estado', estado.toString());
            if (imagen) {
                formData.append('imagen', imagen);
            }


            try {

                const addMovie = movieService.postMovies(formData);
                alert(addMovie);

            } catch (error) {
                console.log('Error: ', error);
                alert("No se añadir la pelicula")
            }

        }



    }

    useEffect(() => {
        const loadData = async () => {
            try {

                if (id !== undefined) {

                    const movieValues = await movieService.getMovieById(Number(id));
                    setNombre(movieValues.nombre);
                    setSinopsis(movieValues.sinopsis);
                    setClasificacion(movieValues.clasificacion);
                    setDuracion(movieValues.duracion);
                    setEstado(movieValues.estado);
                    setImagen(movieValues.imagen);
                    setPreview(movieValues.imagen);

                }
            } catch (error) {
                console.log('Error: ', error);
                alert("No se pudo cargar la pelicula especifica")
            }
        };

        loadData();


    }, [id]);



    return (<form className={style['form-movie']} onSubmit={handleSubmit}>
        <div className={[style['container-movieform'], style.posname].join(' ')}>
            <div className={style.entryarea}>
                <input name="nombre" className={style['input-form-m']} type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} required />
                <label htmlFor="nombre" className={style.labelline}>Nombre</label>
            </div>
        </div>

        <div className={[style['container-movieform'], style.posduration].join(' ')}>
            <div className={style.entryarea}>
                <input type="number" name="duracion" className={style['input-form-m']} onChange={(e) => setDuracion(Number(e.target.value))} value={duracion} />
                <label htmlFor="duracion" className={style.labelline} >Duracion </label>
            </div>

        </div>

        <div className={[style['container-movieform'], style.posclasification].join(' ')}>
            <div className={style.entryarea}>
                <input className={style['input-form-m']} type="text" name="clasificacion" onChange={(e) => setClasificacion(e.target.value)} value={clasificacion} required />
                <label className={style.labelline} htmlFor="clasificacion">Clasificacion </label>
            </div>
        </div>

        <div className={[style['container-movieform'], style.possinopsis].join(' ')}>
            <div className={style.entryarea}>
                <textarea className={style['input-form-m']} name="sinopsis" onChange={(e) => setSinopsis(e.target.value)} value={sinopsis} required></textarea>
                <label className={style.labelline} htmlFor="sinopsis">Sinopsis</label>
            </div>
        </div>

        <div className={[, style.posstatus].join(' ')}>
            <div className={style.entryarea}>
                <p className={style.labelline}>Estado</p>
                <label>
                    <input type="checkbox" onChange={handleStatus} checked={estado} />
                </label>

            </div>
        </div>

        <div className={[style['container-movieform'], style.posimage].join(' ')}>
            <div className={style.entryarea}>
               
                {preview && <img src={preview} alt="vista previa" style={{ width: 200, marginTop: 10 }} />}
                <input className={style['input-form-m']} type="file" accept="image/*" onChange={handleImageChange} />
                <label className={style.labelline} htmlFor="imagen">Imagen </label>
            </div>

        </div>



        <button className={ style['pos-movie-button'] } type="submit">Añadir</button>

    </form>)
}

export default MovieForm;