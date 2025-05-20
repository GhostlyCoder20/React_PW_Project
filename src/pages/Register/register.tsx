import { Link } from 'react-router-dom';
import "boxicons/css/boxicons.min.css";
import style from './register.module.css';
import { useState } from 'react';
import loginService from '../../services/loginService';

interface FormErrors {
    name?: string,
    lastName?: string,
    email?: string,
    password?: string,
    userName?: string
}

const Register: React.FC = () => {

    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [password, setPassWord] = useState<string>('');
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors: FormErrors = {};

        if (!name) {
            newErrors.name = 'El Nombre es requerido'
            isValid = false;
        }

        if (!lastName) {
            newErrors.lastName = 'El Appellido es requerido'
            isValid = false;
        }

        if (!userName) {
            newErrors.userName = 'El Nombre de usuario es requerido'
            isValid = false;
        }

        if (!email) {
            newErrors.email = 'El correo es requerido'
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'La contraseña es requerida'
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;

    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {

            const formData = new FormData();

        formData.append('nombre', name);
        formData.append('apellido', lastName);
        formData.append('email', email);
        formData.append('nombre_usuario', userName);
        formData.append('contrasena', password);

        try {
                const register = await loginService.postRegister(formData);
                setLastName('');
                setName('');
                setPassWord('');
                setUserName('');
                setEmail('');
                setErrors({});
                alert(register.data);

        } catch (error) {
            console.log('Error en register: ', error);
        }
            
        }
        
    }

    return (<section className={[style['container-register'], style['forms-register']].join(' ')}>
        <div className={[style['form-register'], style['signup-register']].join(' ')}>
            <div className={style["form-content-register"]}>
                <div className={style['header-form']}>Signup</div>
                <form onSubmit={handleRegister}>
                    <div className={[style.field, style['input-field']].join(' ')}>
                        <input type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" className={style.input} />
                        {errors.name && <span style={{ color: 'red'}}>{errors.name}</span>}
                    </div>
                    <div className={[style.field, style['input-field']].join(' ')}>
                        <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="lastname" placeholder="Apellido" className={style.input} />
                        {errors.lastName && <span style={{ color: 'red'}}>{errors.lastName}</span>}
                    </div>
                    <div className={[style.field, style['input-field']].join(' ')}>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className={style.input} />
                        {errors.email && <span style={{ color: 'red'}}>{errors.email}</span>}
                    </div>
                    <div className={[style.field, style['input-field']].join(' ')}>
                        <input value={userName} onChange={(e) => setUserName(e.target.value)} type="username" placeholder="Nombre de usaurio" className={style.password} />
                        {errors.userName && <span style={{ color: 'red'}}>{errors.userName}</span>}
                    </div>
                    <div className={[style.field, style['input-field']].join(' ')}>
                        <input value={password} onChange={(e) => setPassWord(e.target.value)} type="password" placeholder="Contraseña" className={style.password} />
                        {errors.password && <span style={{ color: 'red'}}>{errors.password}</span>}

                    </div>
                    <div className={[style.field, style['button-field']].join(' ')}>
                        <button>Signup</button>
                    </div>
                </form>
                <div className={style["form-link"]}>
                    <span>Already have an account? <Link to='/' className={[style.link, style["login-link"]].join(' ')}>Login</Link></span>
                </div>
            </div>
        </div>

    </section>);

}

export default Register;