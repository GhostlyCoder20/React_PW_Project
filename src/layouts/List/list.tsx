import React, { useEffect} from 'react'
import style from './list.module.css'
import 'swiper/swiper-bundle.css'
import { MovieModel } from '../../models/Movie'
import { Link } from 'react-router-dom'


const List: React.FC<{movies: MovieModel[]}> = ({movies}) => {

  


  useEffect(() => { 
  }, [movies]);

  return (
    <section className={[style['movies'], 'container'].join(' ')} id={style['movies']}>
      <div className={style['heading']}>
        <h2 className={style['heading-title']}>Lista de Peliculas</h2>
      </div>
      <div className={style['movies-content']}>
       

        {/*Caja de pelicula*/}
        {movies.map((movie, index) => (
          
          <div key={movie.id} className={style['movie-box']}>
            <img src={movie.imagen}  alt="" className={style['movie-box-img']} />
            <div className={style['box-text']}>
              <h2 className={style['movie-title']}>{movie.nombre}</h2>
              <span className={style['movie-type']}>Duracion: {movie.duracion} minutos</span>
              <Link to={`/movie/detail/${movie.id}`}>
                  <a href='movie' className={[style['watch-btn'], style['play-btn']].join(' ')}>
                  <i className={[style.bx, 'bx bx-right-arrow'].join(' ')}></i>
                </a>
              </Link>
              
            </div>
          </div>

        ))}



      

      </div>
      <div className={style['next-page']}>
        <a href="next" className={style["next-btn"]}>Siguiente pagina</a>
      </div>
    </section>


  )
}


export default List;