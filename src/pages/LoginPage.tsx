
import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { ChatApi } from '../api/ChatApi';
import { AppContext } from '../context/auth/AppContext';
import { useForm } from '../hooks/useForm'
import { AuthLayout } from '../layout/AuthLayout';
import { InputContainer, RegisterLink, RegisterSection, StyledButton } from '../styled-components';

interface initialState {
    correo: string;
    password: string;
}


export const LoginPage = () => {

    const { state, loginUser, logoutUser,clearErrorMessage } = useContext(AppContext);
    const navigate = useNavigate();

    const { onInputChange, formState } = useForm({ correo: '', password: '' });
    const { correo, password } = formState as initialState;

    const onClickLogin = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (correo.length < 1 || password.length < 1) {
            Swal.fire('Login','Ingrese su email y password','warning')
            return;
        }

        try {
            const resp = await ChatApi.post('/auth/login', { correo, password })
            const { data } = resp;

            localStorage.setItem('token', data.token);
            loginUser(data.usuario.nombre, data.usuario.uid, data.usuario.img);
            navigate('/chat');

        } catch (error) {
            //@ts-ignore
            console.log(error.response.data);
            //@ts-ignore
            logoutUser(error.response.data.msg);
            setTimeout(() => {
                clearErrorMessage()
            }, 100);
        }
    }

    useEffect(() => {
        if (state.errorMessage) Swal.fire('Error de logueo', state.errorMessage, 'error')
    }, [state.errorMessage])

    return (
            <AuthLayout onSubmit={onClickLogin} title={'MERN Chat'}>
                <InputContainer>
                    <input
                        type="email"
                        onChange={onInputChange}
                        value={correo}
                        name='correo'
                        placeholder='Correo'
                        autoComplete='off'
                    />
                </InputContainer>

                <InputContainer>
                    <input
                        type="password"
                        onChange={onInputChange}
                        value={password}
                        name='password'
                        placeholder='Password'
                    />
                </InputContainer>

                <StyledButton>Login</StyledButton>
                <RegisterSection>
                    ¿Eres nuevo por aqui? 
                    <RegisterLink to="/auth/register">Registrate</RegisterLink> 
                </RegisterSection>
            </AuthLayout>
    )
}


