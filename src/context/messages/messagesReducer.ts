import { Message, MessagesState } from "../../interfaces";

type MessageAction =
    | { type: 'load-messages', payload: { messages: Message[] } }
    | { type: 'set-chat-title', payload:{ title:string }}
    | { type: 'set-uid-user-active-chat', payload: { uid: string | null } }
    | { type: 'loading-messages' }


export const messagesReducer = (state: MessagesState, action: MessageAction) => {
    switch (action.type) {
        case 'load-messages':
            return {
                ...state,
                isLoadingMessages:false,
                chatMessages: action.payload.messages
            }
        case 'set-chat-title':
            return {
                ...state,
                chatTitle: action.payload.title
            }
        case 'set-uid-user-active-chat':
            return {
                ...state,
                uidActiveUserChat: action.payload.uid
            }
        case 'loading-messages':
            return {
                ...state,
                isLoadingMessages:true
            }
        default:
            return state;
    }
}