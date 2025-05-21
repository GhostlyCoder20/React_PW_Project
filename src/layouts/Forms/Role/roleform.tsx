import { useState } from 'react';
import style from './roleform.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import rolService from '../../../services/rolService';

const RoleForm: React.FC = () => {
    const { id } = useParams() as { id: string };
    const [nombre, setNombre] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (id !== undefined) {
            const formData = new FormData();

            formData.append('nombre', nombre);
            try {
                const updateMovieHall = await rolService.putRole(Number(id), formData);
                alert(updateMovieHall);
            } catch (error) {
                console.log(error);
                alert("No se puede actualizar el rol")
            }
        } else {

            const formData = new FormData();

            formData.append('nombre', nombre);

            try {
                const addMovieHall = await rolService.postRole(formData);
                alert(addMovieHall);
               
            } catch (error) {
                console.log(error);
                alert("No se puede añadir el rol")
            }



        }

         navigate('/admin/role');
    }

    return (<section className={style['role-form-section']}>
        <div className={style["role-form-container"]}>
            <h1 className={style["role-form-title"]}>Formulario de Rol</h1>
            <form onSubmit={handleSubmit} className={style['role-form-form']}>
                <div className={style["role-form-group"]}>
                    <span>Nombre del Rol: </span>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className={style["role-form-group"]}>

                </div>
                <div className={style['half-form-button']}>
                    <input type="submit" value="Registrar" />
                </div>

                <div className={style['half-form-button']}>
                    <Link to="/admin/role">
                        <input type="button" value="Regresar" />
                    </Link>
                </div>
            </form>
        </div>
    </section>)
}

export default RoleForm;