import { Link } from 'react-router-dom';
import style from './role.module.css';
import { useEffect, useState } from 'react';
import { RoleModel } from '../../../models/role';
import rolService from '../../../services/rolService';


const Role: React.FC = () => {

    const [id, setId] = useState<number>(0);
        const [rols, setRols] = useState<RoleModel[]>([]);
        const [loading, setLoading] = useState<boolean>(true);
        const [error, setError] = useState<string | null>(null);

    const loadRols = async () => {
         try {
            const rolsData = await rolService.getRols();
            setRols(rolsData);
        } catch (error) {
            console.log(error);
            setError('Error al cargar los roles')
        } finally {
            setLoading(false);
        }
    }

      const deleterole = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            const deleteRol = await rolService.deleteRol(id);
            console.log(deleteRol);
            alert(deleteRol);

            loadRols();

        } catch (error) {
            console.log('Error: ', error);
            alert("No se pudo eliminar el rol")
        }
    }

    useEffect(() => {
        loadRols();
    }, [])

     if (loading) {
        return <p>Cargando Roles</p>

    }

    if (error) {
        return <p>{error}</p>
    }

    return(<section className={style['rolecatalog-section']}>

        <div className={style['rolecatalog-header']}>
            <h1 className={style['h1pos']}>Lista de Roles</h1>

            <Link to='/admin/role/add'>
                <button className={style['btn-h']}>Añadir</button>
            </Link>

            <Link to='/admin'>
                <button className={style['btn-h']}>Regresar</button>
            </Link>

        </div>

        <hr />

        <div className={style['rolecatalog-content']}>
            <table className={style['rolecatalog-table']}>
                <thead>
                    <tr>
                        <th>ID Rol</th>
                        <th>Nombre de Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    {rols.map((s) => (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.nombre}</td>

                            <td>

                                <div className={style['action-row']}>
                                    <Link className={style['btn-a']} to={`/admin/role/update/${s.id}`}>
                                        <i className='bx bx-edit'></i>
                                    </Link>
                                    <form onSubmit={deleterole} className={style['form-action-delete']} >

                                        <button className={style['btn-a']} onClick={(e) => setId(s.id)} type='submit'>
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
}

export default Role;