import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faChair, faFilm, faPersonBooth } from '@fortawesome/free-solid-svg-icons';
import style from './admin.module.css'
import { Link } from 'react-router-dom';


const Admin: React.FC = () => {
     return (
          <section className={style.sectionStyle}>
               <div className={style.card}>
                    <FontAwesomeIcon className={style['icon-font']} icon={faFilm}></FontAwesomeIcon>
                    <div className={style.title}>Peliculas</div>
                    <div className={style.detail}>
                         Mantenedor de todas las peliculas disponibles en el cine hasta el momento
                    </div>
                    <div className={style['button-container']}>
                         <Link to="movie">
                              <button className={style['btn-main']}>Entrar</button>
                         </Link>

                    </div>
               </div>
               {/* Mantenedor de Salas */}
               <div className={style.card}>
                    <FontAwesomeIcon className={style['icon-font']} icon={faPersonBooth}></FontAwesomeIcon>
                    <div className={style.title}>Salas</div>
                    <div className={style.detail}>
                         Mantenedor de todas las salas con sus asientos 
                    </div>
                    <div className={style['button-container']}>
                         <Link to="hall">
                              <button className={style['btn-main']}>Entrar</button>
                         </Link>

                    </div>
               </div>
               {/* Mantenedor de Asientos*/}
               <div className={style.card}>
                    <FontAwesomeIcon className={style['icon-font']} icon={faChair}></FontAwesomeIcon>
                    <div className={style.title}>Asientos</div>
                    <div className={style.detail}>
                         Mantenedor de todos los asientos de las salas
                    </div>
                    <div className={style['button-container']}>
                         <Link to="seat">
                              <button className={style['btn-main']}>Entrar</button>
                         </Link>

                    </div>
               </div>
               {/* Mantenedor de Rols */}
               <div className={style.card}>
                    <FontAwesomeIcon className={style['icon-font']} icon={faAddressBook}></FontAwesomeIcon>
                    <div className={style.title}>Roles</div>
                    <div className={style.detail}>
                         Mantenedor de todos los roles 
                    </div>
                    <div className={style['button-container']}>
                         <Link to="role">
                              <button className={style['btn-main']}>Entrar</button>
                         </Link>

                    </div>
               </div>
          </section>

     )
}

export default Admin;