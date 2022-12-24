export interface AuthState{
    authenticated: string;
    username:string | null;
    uid:string | null;
    conversations: Conversation[];
    activeUsers: User[];
    chatMessages: Message[];
    uidActiveUserChat: string | null;
    chatTitle: string;
    errorMessage:string | undefined;
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
    sender:{ _id: string, nombre:string, img:string };
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