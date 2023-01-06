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
  width: 50px;
  height: 50px;
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255,255,255,0.25);
  top: 5px;
  right: 5px;
  z-index: 200;
`