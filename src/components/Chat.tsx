import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { RxHamburgerMenu } from 'react-icons/rx'
import { MdLogout } from 'react-icons/md'

import { Message } from '../interfaces';
import { AppContext } from '../context/AppContext';
import { useChat } from '../hooks/useChat';
import { MessageComponent } from './MessageComponent';
import { NoChatSelected } from './NoChatSelected'
import { WriteMessage } from './WriteMessage'
import { ConversationsAndOnlineUsers } from './ConversationsAndOnlineUsers'

export const Chat = () => {

    const { state } = useContext(AppContext);
    const [onlineUsersCollapsed, setOnlineUsersCollapsed] = useState<boolean>(true);

    const { username, chatMessages, chatTitle } = state;

    const {
        newMessage,
        activeChatUserName,
        activeChatUserId,
        currentConversation,
        currentReceiver,
        messagesEndRef,
        newMessageReceived,
        setCurrentConversation,
        setCurrentReceiver,
        setMessageToNewConversation,
        setNewMessage,
        setNewMessageReceived,
        onClickSend,
        onLogout,
        onWritingMessage,
    } = useChat();


    return (
        <Container>
            <TopContent>
                <h3>Hola {username}</h3>
                <button onClick={onLogout} >
                    Logout
                    <MdLogout size={20} />
                </button>
            </TopContent>
            <MainContentDiv>

                <ConversationsAndOnlineUsers
                    currentConversation={currentConversation}
                    onlineUsersCollapsed={onlineUsersCollapsed}
                    setOnlineUsersCollapsed={setOnlineUsersCollapsed}
                    setCurrentConversation={setCurrentConversation}
                    setCurrentReceiver={setCurrentReceiver}
                    setMessageToNewConversation={setMessageToNewConversation}
                    newMessageReceived={newMessageReceived}
                />

                <ChatContainerDiv collapsed={onlineUsersCollapsed}>
                    <TitleChatContainer>
                        <h4>{chatTitle}</h4>
                        <ButtonCollapse
                            onClick={() => setOnlineUsersCollapsed(false)}>
                            <RxHamburgerMenu size={18} />
                        </ButtonCollapse>
                    </TitleChatContainer>
                    <MessagesContainer>
                        {
                            (!currentConversation )
                                ? <NoChatSelected />
                                : (chatMessages.length < 1
                                    ? <p>Aun no hay mensajes</p>
                                    : chatMessages.map((e: Message, i) => (
                                        <MessageComponent
                                            key={e.uid}
                                            from={e.sender._id}
                                            name={e.sender.nombre}
                                            message={e.mensaje}
                                            fecha={e.fecha}
                                            img={e.sender.img}
                                        />
                            )))
                        }
                        <div ref={messagesEndRef} />
                        <div style={{ color: 'gray',marginTop:'10px',height:'20px' }}>
                            {
                                (activeChatUserName.length > 1 && currentConversation && (currentReceiver === activeChatUserId))
                                && `${activeChatUserName} is writting a message...`
                            }
                        </div>
                    </MessagesContainer>

                    <WriteMessage
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                        onClickSend={onClickSend}
                        onWritingMessage={onWritingMessage}
                    />

                </ChatContainerDiv>
            </MainContentDiv>
        </Container>
    );
}

interface ChatContentDivProps {
    collapsed: boolean;
}
const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
    position: relative;
    
`
const TopContent = styled.div`
    width: 60%;
    display: flex;
    align-items:center;
    padding: 0 15px;
    /* justify-content: center; */
    @media screen and (max-width: 1370px) {
        width: 80%;
        max-width: 80%;
    }
    @media screen and (max-width: 1024px) {
        width: 95%;
        max-width: inherit;
    }
    h3{
        flex:1
    }
    button{
        justify-self: flex-end;
        background-color: #afddfc;
        border: none;
        width: 100px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 10px;
    }
`
const ButtonCollapse = styled.button`
    border: none;
    display: none;
    @media screen and (max-width: 600px) {
        display: initial;
    }
`
const MainContentDiv = styled.div`
    position: relative;
    width: 60%;
    display: flex;
    min-height: 90vh;
    max-height: 80vh;
    border-radius: 20px;
    overflow: hidden;
    background: rgba( 255, 255, 255, 0.45 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 11px );
    -webkit-backdrop-filter: blur( 11px );
    @media screen and (max-width: 1370px) {
        width: 80%;
        max-width: 80%;
    }
    @media screen and (max-width: 1024px) {
        width: 95%;
        max-width: inherit;
    }
`
const ChatContainerDiv = styled.div<ChatContentDivProps>`
    position: relative;
    background-color: rgb(241, 241, 241);
    width: 70%;
    padding:0 10px;
    height: 100%;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px ;
    transition: background-color .3s ease-in-out;
    @media screen and (max-width: 600px) {
        width: 100%;
        &::after{
            content: '';
            position: absolute;
            top:0;
            left:0;
            width: 100%;
            height: 100%;
            background-color: ${({ collapsed }) => collapsed ? 'transparent' : '#2222225c'};
            z-index:${({ collapsed }) => collapsed ? '-1' : '100'};
        }
    }
`
const TitleChatContainer = styled.div`
    width: 100%;
    height: 8%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
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
