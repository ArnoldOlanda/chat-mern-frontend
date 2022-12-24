import React from 'react'
import styled from 'styled-components'

export const NoChatSelected = () => {
  return (
    <Div>Selecciona un chat para comenzar</Div>
  )
}

const Div = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    color: #dad8d8;
    
`