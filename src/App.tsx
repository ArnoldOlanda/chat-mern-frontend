import React,{ useContext } from 'react'
import styled from 'styled-components'
import { MdOutlineLightMode, MdOutlineNightlightRound } from 'react-icons/md'

import { RouterApp } from "./Routes/RouterApp"
import { ConversationsProvider } from "./context/conversations/ConversationsContext"
import { MessagesProvider } from "./context/messages/MessagesContext"
import { ThemePreferenceContext } from './context/theme/ThemeContext'



function App() {

  const { currentTheme, setTheme} = useContext(ThemePreferenceContext)

  return (
    <div>
      <ConversationsProvider>
        <MessagesProvider>
          {
            currentTheme !== 'main' 
            ? (
              <Button onClick={()=> setTheme('main')} >
                <MdOutlineLightMode size={25} color='#fff'/>
              </Button>
            )
            :(
              <Button onClick={()=> setTheme('dark')} >
                <MdOutlineNightlightRound size={25} color='#fff' />
              </Button>
            ) 
          }
          <RouterApp />
        </MessagesProvider>
      </ConversationsProvider>
    </div>
  )
}

export default App

const Button = styled.button`
  background-color: transparent;
  border: none;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 200;
`