import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ChatApi } from '../api/ChatApi';
import { AppContext } from '../context/auth/AppContext';
import { useForm } from '../hooks/useForm'
import { AuthLayout } from '../layout/AuthLayout'
import { InputContainer, StyledButton } from '../styled-components';

interface initialState {
  nombre: string;
  correo: string;
  password: string;
  password2: string
}

const initialState = {
  nombre: '',
  correo: '',
  password: '',
  password2:''
}

export const RegisterPage = () => {

  const navigate = useNavigate();

  const { loginUser, logoutUser, clearErrorMessage, state } = useContext(AppContext)

  const { formState, onInputChange } = useForm(initialState)

  const { nombre, correo, password, password2 } = formState as initialState

  const onClickRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (correo.length < 1 || password.length < 1 || nombre.length < 1 || password2.length < 1) {
      Swal.fire('Registro de usuario', 'Por favor llene todos los campos', 'warning')
      return;
    }

    if (password !== password2) {
      Swal.fire('Registro de usuario', 'Las contraseña no coinciden', 'error')
      return;
    }

    try {
      const resp = await ChatApi.post('/usuarios', {
        nombre,
        correo,
        password
      })

      const { data } = resp;

      localStorage.setItem('token', data.token);
      loginUser(data.usuario.nombre, data.usuario.uid, data.usuario.img);
      navigate('/chat');

    } catch (error) {
      //@ts-ignore
      logoutUser(error.response.data?.errors.correo.msg);
      //@ts-ignore
      console.log(error.response.data?.errors.correo.msg);
      
      setTimeout(() => {
        clearErrorMessage()
      }, 100);
    }
  }

  useEffect(() => {
    if (state.errorMessage) Swal.fire('Error en el registro', state.errorMessage, 'error')
  }, [state.errorMessage])


  return (
    <AuthLayout onSubmit={onClickRegister} title='Register' goBack >
      <InputContainer>
        <input
          onChange={onInputChange}
          value={nombre}
          name='nombre'
          placeholder='Username'
          autoComplete='off'
        />
      </InputContainer>
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
      <InputContainer>
        <input
          type="password"
          onChange={onInputChange}
          value={password2}
          name='password2'
          placeholder='Repeat password'
        />
      </InputContainer>
      <StyledButton>Register</StyledButton>
    </AuthLayout>
  )
}
