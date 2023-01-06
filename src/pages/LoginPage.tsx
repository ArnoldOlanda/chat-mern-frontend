
import React, { useContext, useEffect } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
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

    const { state, startLoading, loginUser, logoutUser, clearErrorMessage } = useContext(AppContext);
    const navigate = useNavigate();

    const {errorMessage, isLoading} = state
    const { onInputChange, formState } = useForm({ correo: '', password: '' });
    const { correo, password } = formState as initialState;

    const onClickLogin = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (correo.length < 1 || password.length < 1) {
            Swal.fire('Login','Ingrese su email y password','warning')
            return;
        }

        try {
            startLoading();

            const resp = await ChatApi.post('/auth/login', { correo, password })
            const { data } = resp;

            localStorage.setItem('token', data.token);

            loginUser(data.usuario.nombre, data.usuario.uid, data.usuario.img);

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
            Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
            })

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
        if (errorMessage) Swal.fire('Error de logueo', errorMessage, 'error')
    }, [errorMessage])
    

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

                <StyledButton>
                    {
                        isLoading 
                        ?   (<TailSpin
                                height="25"
                                width="25"
                                color="#fcfcfc"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                visible={true}
                            />)
                        : 'Login'
                    }
                    
                </StyledButton>
                <RegisterSection>
                    ¿Eres nuevo por aqui? 
                    <RegisterLink to="/auth/register">Registrate</RegisterLink> 
                </RegisterSection>
            </AuthLayout>
    )
}


