import React, { FC, useRef, useEffect, useContext } from 'react'
import styled from 'styled-components'

import { AppContext } from '../context/auth/AppContext'
import { ConversationsContext } from '../context/conversations/ConversationsContext'
import { MessagesContext } from '../context/messages/MessagesContext'
import { Message } from '../interfaces'
import { Loading } from './Loading'
import { MessageComponent } from './MessageComponent'
import { NoChatSelected } from './NoChatSelected'


export const Messages:FC = () => {

    
    const {state} = useContext(MessagesContext);
    const {state: conversationsState, setActiveChatName} = useContext(ConversationsContext);

    const { currentConversation,currentReceiver, activeChatUserId, activeChatUserName } = conversationsState

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { chatMessages, isLoadingMessages } = state;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    
    useEffect(() => {
        scrollToBottom()
    }, [chatMessages]);

    useEffect(() => {
        let timeout: any;
        if (activeChatUserName.length > 1) {
            scrollToBottom()
            timeout = setTimeout(() => {
                setActiveChatName('')
            }, 1000);
        };
        return () => {
            clearTimeout(timeout)
        }
    }, [activeChatUserName])

    return (
        <MessagesContainer>
            {
                (!currentConversation)
                    ? <NoChatSelected />
                    : ( isLoadingMessages )
                        ? (<Loading />)
                        : (chatMessages.length < 1
                            ? <p>Aun no hay mensajes</p>
                            : chatMessages.map((e: Message, i) => (
                                <MessageComponent
                                    key={ i }
                                    from={e.sender._id}
                                    name={e.sender.nombre}
                                    message={e.mensaje}
                                    fecha={e.fecha}
                                    img={e.sender.img}
                                />
                        )))
            }
            <div ref={messagesEndRef} />
            <div style={{ color: 'gray', marginTop: '10px', height: '20px' }}>
                {
                    (activeChatUserName.length > 1 && currentConversation && (currentReceiver === activeChatUserId))
                    && `${activeChatUserName} is writting a message...`
                }
            </div>
        </MessagesContainer>
    )
}

const MessagesContainer = styled.div`
    height: calc(90% - 50px);
    max-height:calc(90% - 50px); 
    overflow:auto ;
    &::-webkit-scrollbar{
        width: 8px;
    }
    &::-webkit-scrollbar-track {
        background: #cfcfcf;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background: #038cfc;
        border-radius: 10px;
    }
`