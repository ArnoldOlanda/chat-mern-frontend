import React, { useContext, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ChatApi } from '../api/ChatApi'
import { Chat } from '../components/Chat'
import { AppContext } from '../context/AppContext'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'

export const RouterApp = () => {

  const { state, logoutUser, loginUser } = useContext(AppContext)

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        logoutUser('')
        return;
      }
      
      const { data } = await ChatApi.get('/auth/renew')

      localStorage.setItem('token', data.token);
      loginUser(data.usuario.nombre, data.usuario.uid);

    } catch (error) {
      //@ts-ignore
      console.log(error.response);
      localStorage.clear()
      logoutUser('')

    }
  }

  useEffect(() => {
      checkAuth()
  }, [])

  if(state.authenticated === 'checking'){
    return (
        <h3>Cargando...</h3>
    )
  }

  return (
    <Routes>
      {
        state.authenticated === 'not-authenticated'
          ? (
            <>
              <Route path='/auth/login' element={<LoginPage />} />
              <Route path='/auth/register' element={<RegisterPage />} />
              <Route path='/*' element={<Navigate to={'/auth/login'} />} />
            </>
          )
          : (
            <>
             <Route path='/' element={<Chat />} />
              <Route path='/*' element={<Navigate to={'/'} />} />
            </>
          )
      }
    </Routes>
  )
}
