import React from 'react'
import styles from './home.module.css'

import "boxicons/css/boxicons.min.css";
const Home: React.FC = () => {
    return  <div>
    <section className={[styles.home, 'container'].join(' ')} id='home'>
        {/* Home Image */}
        <img src='/dune-home-img.jpg' alt='home-image' className={styles.homeImg}></img>
        <div className={styles['home-text']} >
            <h1 className={styles['home-title']}>Dune parte Dos</h1>
            <p>En vivo desde el 10 de abril</p>
            <a href='home' className={styles['watch-btn']}>
                
                <i className={[styles.bx ,'bx bx-right-arrow'].join(' ')}></i>
                <span>Mira el trailer</span>
            </a>
        </div>
    </section>
</div>
}

export default Home;