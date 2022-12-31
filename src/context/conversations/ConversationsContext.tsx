import { createContext, FC, useReducer, useContext } from "react";
import { AuthState, Conversation, ConversationsState, User } from "../../interfaces";
import { AppContext } from "../auth/AppContext";
import { conversationsReducer } from "./conversationsReducer";

interface Props {
    children: JSX.Element | JSX.Element[]
}

const initialState:ConversationsState = {
    activeUsers: [],
    conversations: [],
    activeChatUserName: '',
    activeChatUserId: '',
    currentConversation: null,
    currentReceiver: null

}

interface ContextProps {
    state: ConversationsState;
    loadUsers: (data: User[]) => void;
    loadConversations: (data: Conversation[]) => void
    setActiveChatName: (name: string) => void;
    setActiveChatId: (name: string) => void;
    setCurrentConversation: (name: string | null) => void;
    setCurrentReceiver: (name: string | null) => void;
}

export const ConversationsContext = createContext<ContextProps>({} as ContextProps);

export const ConversationsProvider: FC<Props> = ({ children }) => {
    const {state: authState} = useContext(AppContext)

    const [state, dispatch] = useReducer(conversationsReducer, initialState);

    
    const loadConversations = (data:Conversation[]) => {
        dispatch({
            type:'load-conversations',
            payload:{
                conversations: data
            }
        })
    }

    const loadUsers = (data: User[]) => {
        const filteredUsers = data.filter(user => user.uid !== authState.uid);
        dispatch({
            type: 'load-users',
            payload: {
                users: filteredUsers
            }
        })
    }

    const setActiveChatName = (name: string) => {
        dispatch({
            type: 'set-active-chat-name',
            payload: { name }
        })
    }

    const setActiveChatId = (uid: string)=>{
        dispatch({
            type: 'set-active-chat-id',
            payload: { uid }
        })
    }

    const setCurrentConversation = (uid: string | null) => {
        dispatch({
            type: 'set-current-conversation',
            payload: { uid }
        })
    }

    const setCurrentReceiver = (uid: string | null) => {
        dispatch({
            type: 'set-current-receiver',
            payload: { uid }
        })
    }

    return (
        <ConversationsContext.Provider
            value={{
                state,
                loadUsers,
                loadConversations,
                setActiveChatName,
                setActiveChatId,
                setCurrentConversation,
                setCurrentReceiver
            }}
        >
            {children}
        </ConversationsContext.Provider>
    )
}