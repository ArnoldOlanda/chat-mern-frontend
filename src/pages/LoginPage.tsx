
import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { ChatApi } from '../api/ChatApi';
import { AppContext } from '../context/AppContext';
import { useForm } from '../hooks/useForm'
import { AuthLayout } from '../layout/AuthLayout';

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
            loginUser(data.usuario.nombre, data.usuario.uid);
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


const InputContainer = styled.div`
    display: flex;
    align-items: center;
    height: 45px;
    margin-bottom: 10px;
    input{
        background-color: #ffffff90;
        outline: none;
        width: 100%;
        height: 100%;
        border: none;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 40px;
        font-size: 16px;
        color:#292929;
    }
`

const StyledButton = styled.button`
    background-color: #3448f1;
    color:#fff;
    width: 100%;
    height: 45px;
    border-radius: 40px;
    border:none;
    transition: background .3s ease-in-out;
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: 20px;
    &:hover{
        background-color: #1d2ec7;
    }
    &:active{
        background-color: #7086ff;
    }
`

const RegisterSection = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    user-select: none;
`
const RegisterLink = styled(Link)`
    text-decoration: none;
    &:visited{
        color: blue;
    }
`