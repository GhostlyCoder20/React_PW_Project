import { Link, useNavigate } from 'react-router-dom';
import style from './login.module.css';

import "boxicons/css/boxicons.min.css";
import loginService from '../../services/loginService';
import { useState } from 'react';
import { log } from 'console';

const Login: React.FC = () => {

    const [error, setError] = useState('');
    const [password, SetPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        const formData = new FormData();

        formData.append('email', email);
        formData.append('password', password);
        
        try {

            const login =  await loginService.postLogin(formData);

            
            if (login === 404) {
                setError('Usuario no encontrado')
            } else {
               
                navigate('/home');
            }

            
        } catch (error) {
            console.log('Error: ', error)
            setError('Error de red o servidor')
        }
    }


    return (
        <section className={[style.container, style.forms].join(' ')}>
            <div className={[style.form, style.login].join(' ')}>
               
                <div className={style['form-content']}>
                     
                    <div className={style['header-form']}>Login</div>
                   
                    <form onSubmit={handleLogin}>
                         {error && <p style={{ color: 'red', display: 'flex' , justifyContent: 'center' }}>{error}</p>}
                        <div className={[style.field, style['input-field']].join(' ')}>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className={style.input} />
                        </div>
                        <div className={[style.field, style['input-field']].join(' ')}>
                            <input value={password} onChange={(e) => SetPassword(e.target.value)} type="password" placeholder="Password" className={style.password} />
                            <i className={['bx bx-hide', style['eye-icon']].join(' ')}></i>
                        </div>
                        <div className={style["form-link"]}>
                            <a href="forgot" className={style["forgot-pass"]}>Forgot password?</a>
                        </div>
                        <div className={[style.field, style['button-field']].join(' ')}>
                            <input type="submit" value="Ingresar" />
                            
                        </div>
                    </form>
                    <div className={style["form-link"]}>
                        <span>Don't have an account? <Link to='/register'>Signup</Link> </span>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default Login;

