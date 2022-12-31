import React, { useContext, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ChatApi } from '../api/ChatApi'
import { Chat } from '../pages/Chat'
import { AppContext } from '../context/auth/AppContext'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { TailSpin } from 'react-loader-spinner'
import styled from 'styled-components'
import { MessagesProvider } from '../context/messages/MessagesContext'

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
      loginUser(data.usuario.nombre, data.usuario.uid, data.usuario.img);

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

  if (state.authenticated === 'checking') {
    return (
      <Container>
        <TailSpin
          height="80"
          width="80"
          color="#fcfcfc"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </Container>
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

const Container = styled.div`
  width:100%;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
`