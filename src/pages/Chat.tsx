import React, { useState } from 'react'

import { useChat } from '../hooks/useChat';
import { WriteMessage, Messages, TitleChat, ConversationsAndOnlineUsers } from '../components'
import { ChatContainerDiv, Container, MainContentDiv } from '../styled-components';

export const Chat = () => {

    const [onlineUsersCollapsed, setOnlineUsersCollapsed] = useState<boolean>(true);

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




