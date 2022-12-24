import './Login.scss';
import React, { useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Register from './Register/Register';
import Form from '../../Components/Form/Form';
import axios from "axios";
import Swal from 'sweetalert2';
/* Context */
import {useConfigContext} from '../../Contexts/ConfigContext'
import { useUserContext } from '../../Contexts/UserContext';

function Login() {
    const context = useConfigContext();
    const {isAdmin} = useUserContext();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        const url = "/api/auth/login"
        
        const body = { "email":email, "password":password };
        axios.post(url, body)
            .then(response => {
                const token = response.data.token;
                const role = response.data.user.role;

                localStorage.setItem("token", token);
                localStorage.setItem("role", role);

                if(response.status === 200){
                    context.Login()
                    Swal.fire({
                        icon: 'success',
                        title: 'Login exitoso',
                        text: 'Redirigiendo a la página principal',
                        timer: 1000,
                        showConfirmButton: false,
                        timerProgressBar: true,
                    })
                    isAdmin()
                    navigate("/feed");
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El usuario o la contraseña son incorrectos',
                })
            });
    }

    useEffect(() => {
    }, [email, password]);

    const formFields = [{
        'key': '1',
        'element':'label',
        'type': 'text',
        'text': 'Correo',
        'valueInput': email,
        'setValue': setEmail
    },
    {
        'key': '2',
        'element':'label',
        'type': 'password',
        'text': 'Contraseña',
        'valueInput': password,
        'setValue': setPassword
    },
    {
        'key': '3',
        'element':'link',
        'path':'/login/register',
        'text': "¿No tienes una cuenta? Regístrate"
    },
    ]

    return (
        <>
            <Routes>
                <Route path='/' element={<Form title={'Iniciar sesión'} formType={'login'} formFields={formFields} justContinue={true} continueText={'Iniciar sesión'} continueHandle={(e) => handleSubmit(e)}/>}/>
                <Route path='/register' element={<Register />}/>
            </Routes>
        </>
    );
}

export default Login;