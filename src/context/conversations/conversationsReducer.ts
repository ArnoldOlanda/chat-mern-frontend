import { Conversation, ConversationsState, User } from "../../interfaces";

type ConversationsAction =
    | { type: 'load-users', payload: { users: User[] } }
    | { type: 'load-conversations', payload: { conversations: Conversation[] } }
    | { type: 'set-active-chat-name', payload: { name: string } }
    | { type: 'set-active-chat-id', payload: { uid: string } }
    | { type: 'set-current-conversation', payload: { uid: string | null } }
    | { type: 'set-current-receiver', payload: { uid: string | null } }


export const conversationsReducer = (state: ConversationsState, action: ConversationsAction) => {
    switch (action.type) {
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
        case 'set-active-chat-name':
            return {
                ...state,
                activeChatUserName: action.payload.name
            }
        case 'set-active-chat-id':
            return {
                ...state,
                activeChatUserId: action.payload.uid
            }
        case 'set-current-conversation':
            return {
                ...state,
                currentConversation: action.payload.uid
            }
        case 'set-current-receiver':
            return {
                ...state,
                currentReceiver: action.payload.uid
            }
        default:
            return state;
    }
}