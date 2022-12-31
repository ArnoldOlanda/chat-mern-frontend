import React, { useContext, useState } from 'react'

import { useChat } from '../hooks/useChat';
import { AppContext } from '../context/auth/AppContext';
import { WriteMessage, Messages, TitleChat, ConversationsAndOnlineUsers } from '../components'
import { ChatContainerDiv, Container, MainContentDiv, TopContent } from '../styled-components';

export const Chat = () => {

    const { state } = useContext(AppContext);
    const [onlineUsersCollapsed, setOnlineUsersCollapsed] = useState<boolean>(true);

    const { username } = state;

    const {
        newMessage,
        newMessageReceived,
        setMessageToNewConversation,
        setNewMessage,
        onClickSend,
        onLogout,
        onWritingMessage,
    } = useChat();

    const setCollapsed = (collapsed: boolean) => {
        setOnlineUsersCollapsed(collapsed);
    }

    return (
            <Container>
                <TopContent>
                    <h3>Hola {username}</h3>
                </TopContent>
                <MainContentDiv>

                    <ConversationsAndOnlineUsers
                        onlineUsersCollapsed={onlineUsersCollapsed}
                        setOnlineUsersCollapsed={setOnlineUsersCollapsed}
                        setMessageToNewConversation={setMessageToNewConversation}
                        newMessageReceived={newMessageReceived}
                        onLogout={onLogout}
                    />

                    <ChatContainerDiv collapsed={onlineUsersCollapsed}>

                        <TitleChat setCollapsed={setCollapsed} />

                        <Messages />

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




