export * from './styled-components'
export interface AuthState{
    authenticated: string;
    username:string | undefined;
    uid:string | undefined;
    img:string | undefined;
    errorMessage:string | undefined;
    conversations: Conversation[];
    activeUsers: User[];
    uidActiveUserChat: string | null;
}

export interface MessagesState{
    isLoadingMessages: boolean;
    chatMessages: Message[];
    chatTitle: string;
}

export interface ConversationsState{
    conversations: Conversation[];
    activeUsers: User[];
    activeChatUserName: string;
    activeChatUserId: string;
    currentConversation: string | null;
    currentReceiver: string | null;
}

export interface User {
    nombre: string;
    correo: string;
    rol: string;
    google: boolean;
    uid: string;
    img:string;
}

export interface Message{
    uid?:string;
    sender:{ _id?: string, nombre?:string, img?:string };
    mensaje:string;
    fecha: Date;
    conversation_id?:string;
}

export interface ConversationsResponse {
    ok: boolean;
    conversations: Conversation[];
}

export interface ConversationResponse{
    ok: boolean;
    conversation: Conversation;
}
  
export interface Conversation {
    members: Member[];
    new_messages:boolean;
    __v: number;
    uid: string;
}
  
export interface Member {
    _id: string;
    nombre: string;
    img: string;
} 