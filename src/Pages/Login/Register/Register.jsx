import './Register.scss';
import React, { useState } from 'react';
import Form from '../../../Components/Form/Form';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';

function Registro() {
    const [name, setName] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        const url = "/api/users";

        const body = {
            "name": name,
            "email": correo,
            "password": password
        };
        axios.post(url, body)
            .then(response => {
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Usuario registrado',
                        text: 'Ahora puedes iniciar sesión',
                        timer: 2000,
                        showConfirmButton: false,
                        timerProgressBar: true,
                    })
                    navigate("/login");
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            });
    }

    const formFields = [{
        'key': '1',
        'element': 'label',
        'type': 'text',
        'text': 'Nombre',
        'valueInput': name,
        'setValue': setName
    },
    {
        'key': '2',
        'element': 'label',
        'type': 'text',
        'text': 'Correo electrónico',
        'valueInput': correo,
        'setValue': setCorreo
    },
    {
        'key': '3',
        'element': 'label',
        'type': 'password',
        'text': 'Contraseña',
        'valueInput': password,
        'setValue': setPassword
    },
    {
        'key': '4',
        'element': 'link',
        'path': '/login',
        'text': "¿Ya tienes una cuenta? Inicia sesión"
    }
    ]

    return (
        <>
            <Form title={'Registrarse'} formType={'registro'} formFields={formFields} justContinue={true} continueText={'Registrarse'} continueHandle={(e) => handleSubmit(e)} />
        </>
    );
}

export default Registro;
