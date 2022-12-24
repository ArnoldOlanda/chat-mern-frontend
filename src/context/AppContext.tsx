import { createContext, FC, useEffect, useReducer } from "react";
import { AuthState, Conversation, Message, User } from "../interfaces";
import { authReducer } from "./authReducer";

interface Props {
    children: JSX.Element | JSX.Element[]
}

const initialState:AuthState = {
    authenticated: 'checking',
    username: null,
    uid: null,
    activeUsers: [],
    chatMessages: [],
    conversations: [],
    uidActiveUserChat: null,
    chatTitle: '',
    errorMessage: undefined
}

interface ContextProps {
    state: AuthState;
    loginUser: (user: string, uid: string) => void;
    logoutUser: (message: string) => void;
    loadMessages: (data: Message[]) => void;
    loadUsers: (data: User[]) => void;
    loadConversations: (data: Conversation[]) => void
    setChatTitle: (title:string) => void
    setActiveChat: (uid: string | null) => void;
    clearErrorMessage: () => void;
}

export const AppContext = createContext<ContextProps>({} as ContextProps);

export const AppProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, initialState);

    const loginUser = (user: string, uid: string) => {
        dispatch({
            type: 'login',
            payload: { user, uid }
        })

    }
    const logoutUser = (message: string) => {
        dispatch({
            type: 'logout',
            payload: {
                errorMessage: message
            }
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

    const loadConversations = (data:Conversation[]) => {
        dispatch({
            type:'load-conversations',
            payload:{
                conversations: data
            }
        })
    }

    const loadUsers = (data: User[]) => {
        const filteredUsers = data.filter(user => user.uid !== state.uid);
        dispatch({
            type: 'load-users',
            payload: {
                users: filteredUsers
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

    const clearErrorMessage = () => {
        dispatch({
            type: 'clear-error-message'
        })
    }

    return (
        <AppContext.Provider
            value={{
                state,
                loginUser,
                logoutUser,
                loadMessages,
                loadUsers,
                loadConversations,
                setChatTitle,
                setActiveChat,
                clearErrorMessage
            }}
        >
            {children}
        </AppContext.Provider>
    )
}