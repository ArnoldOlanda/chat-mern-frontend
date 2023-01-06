import React,{useContext} from 'react'
import styled from 'styled-components'
import { RxHamburgerMenu } from 'react-icons/rx'
import { MessagesContext } from '../context/messages/MessagesContext'

interface Props{
    setCollapsed: (a:boolean)=>void;
}

export const TitleChat = ({setCollapsed}:Props) => {
    const {state} = useContext(MessagesContext)
    const {chatTitle} = state;

    return (
        <TitleChatContainer>
            <h4>{chatTitle}</h4>
            <ButtonCollapse
                onClick={() => setCollapsed(false)}>
                <RxHamburgerMenu size={18} />
            </ButtonCollapse>
        </TitleChatContainer>
    )
}

const TitleChatContainer = styled.div`
    width: 100%;
    height: 8%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:${ ({ theme })=> theme.title }
`

const ButtonCollapse = styled.button`
    border: none;
    display: none;
    @media screen and (max-width: 600px) {
        display: initial;
    }
`
