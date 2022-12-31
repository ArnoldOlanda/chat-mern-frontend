import { createContext, FC, useEffect, useReducer } from "react";
import { AuthState, Conversation, Message, User } from "../../interfaces";
import { authReducer } from "./authReducer";

interface Props {
    children: JSX.Element | JSX.Element[]
}

const initialState:AuthState = {
    authenticated: 'checking',
    username: undefined,
    uid: undefined,
    img: undefined,
    activeUsers: [],
    conversations: [],
    uidActiveUserChat: null,
    errorMessage: undefined,
}

interface ContextProps {
    state: AuthState;
    loginUser: (user: string, uid: string, img: string) => void;
    logoutUser: (message: string) => void;
    loadUsers: (data: User[]) => void;
    loadConversations: (data: Conversation[]) => void
    setActiveChat: (uid: string | null) => void;
    clearErrorMessage: () => void;
}

export const AppContext = createContext<ContextProps>({} as ContextProps);

export const AppProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, initialState);

    const loginUser = (user: string, uid: string, img: string) => {
        dispatch({
            type: 'login',
            payload: { user, uid, img }
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
                loadUsers,
                loadConversations,
                setActiveChat,
                clearErrorMessage,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}