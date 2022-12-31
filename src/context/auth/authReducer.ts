import { AuthState, Conversation, Message, User } from "../../interfaces";

type AuthAction =
    | { type: 'login', payload: { user: string, uid: string, img: string } }
    | { type: 'logout', payload: { errorMessage?: string } }
    | { type: 'load-users', payload: { users: User[] } }
    | { type: 'load-conversations', payload: { conversations: Conversation[] } }
    | { type: 'set-uid-user-active-chat', payload: { uid: string | null } }
    | { type: 'clear-error-message' }


export const authReducer = (state: AuthState, action: AuthAction) => {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                authenticated: 'authenticated',
                username: action.payload.user,
                uid: action.payload.uid,
                img: action.payload.img
            }
        case 'logout':
            return {
                ...state,
                authenticated: 'not-authenticated',
                username: '',
                uid: '',
                errorMessage: action.payload.errorMessage
            }
        case 'load-users':
            return {
                ...state,
                activeUsers: action.payload.users
            }
        case 'load-conversations':
            return {
                ...state,
                conversations: action.payload.conversations
            }
        case 'set-uid-user-active-chat':
            return {
                ...state,
                uidActiveUserChat: action.payload.uid
            }
        case 'clear-error-message':
            return {
                ...state,
                errorMessage: ''
            }
        default:
            return state;
    }
}