import { createContext, FC, useReducer } from "react";
import { Message, MessagesState } from "../../interfaces";
import { messagesReducer } from "./messagesReducer";


interface Props {
    children: JSX.Element | JSX.Element[]
}

const initialState:MessagesState = {
    chatMessages: [],
    chatTitle: '',
    isLoadingMessages:false
}

interface ContextProps {
    state: MessagesState;
    loadMessages: (data: Message[]) => void;
    setChatTitle: (title:string) => void
    setActiveChat: (uid: string | null) => void;
    startLoadingMessages: () => void;
}

export const MessagesContext = createContext<ContextProps>({} as ContextProps);

export const MessagesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(messagesReducer, initialState);

    const startLoadingMessages = () => {
        dispatch({
            type:'loading-messages'
        })
    }

    const loadMessages = (data: Message[]) => {
        dispatch({
            type: 'load-messages',
            payload: {
                messages: data
            }
        })
    }

    const setChatTitle = (title:string) => {
        dispatch({
            type:'set-chat-title',
            payload:{
                title
            }
        })
    }

    const setActiveChat = (uid: string | null) => {
        dispatch({
            type: 'set-uid-user-active-chat',
            payload: {
                uid
            }
        })
    }

    return (
        <MessagesContext.Provider
            value={{
                state,
                loadMessages,
                setChatTitle,
                setActiveChat,
                startLoadingMessages
            }}
        >
            {children}
        </MessagesContext.Provider>
    )
}