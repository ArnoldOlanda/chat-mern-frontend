import { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import Swal from 'sweetalert2';
import { ChatApi } from '../api/ChatApi';
import { AppContext } from '../context/AppContext';
import { ConversationsResponse, Message, User } from '../interfaces';

let socket: Socket;

export const useChat = () => {
    
    const navigate = useNavigate();

    const {
        state,
        logoutUser,
        loadMessages,
        loadUsers,
        loadConversations,
        setActiveChat
    } = useContext(AppContext);

    const { uid, chatMessages, conversations } = state

    const [newMessage, setNewMessage] = useState('');
    const [activeChatUserName, setActiveChatUserName] = useState<string>('');
    const [activeChatUserId, setActiveChatUserId] = useState<string>('');
    const [currentConversation, setCurrentConversation] = useState<string>();
    const [currentReceiver, setCurrentReceiver] = useState<string>();
    const [newMessageReceived, setNewMessageReceived] = useState<Message>();
    const [messageToNewConversation, setMessageToNewConversation] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const onLogout = () => {
        logoutUser('');
        socket.disconnect();
        localStorage.removeItem('token');
        navigate('/auth/login');
    }

    const onClickSend = async () => {
        if(!currentConversation){
            Swal.fire('Enviar mensaje','Debes seleccionar primero un chat','error');
            return;
        }

        const payload = {
            mensaje: newMessage,
            fecha: new Date(),
            conversation_id: currentConversation,
            sender: uid,
            currentReceiver
        }

        socket.emit('enviar-mensaje', payload);
        setNewMessage('');
        setActiveChatUserName('');

        const { data } = await ChatApi.put<ConversationsResponse>(`/conversation/${currentConversation}`,{senderId: uid});
        loadConversations(data.conversations);

        if(messageToNewConversation){
            socket.emit('nueva-conversacion', { id:currentConversation, receiver:currentReceiver });
        }

    }

    const onWritingMessage = () => {
        socket.emit('escribiendo', currentReceiver)
    }
    const fetchConversations = async () => {
        const { data } = await ChatApi.get<ConversationsResponse>(`/conversation/${state.uid}`)
        loadConversations(data.conversations)
    }

    const fetchMessages = async () => {
        const { data } = await ChatApi.get(`/mensajes/${currentConversation}`);
        loadMessages(data.mensajes);
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        fetchConversations();
        socket = io('http://192.168.1.34:8000', {
            extraHeaders: { "x_token": localStorage.getItem('token') || "" }
        });

        socket.on('connect', () => { console.log('sockets online') });
        socket.on('disconnect', () => { console.log('sockets offline') });

        socket.on('usuarios-activos', (users: User[]) => {
            loadUsers(users);
        });

        socket.on('recibir-mensajes', ({mensaje, conversations}) => {
            setNewMessageReceived(mensaje)
            if(conversations){
                loadConversations(conversations)
            }
        })


        socket.on('escribiendo-mensaje', ({ nombre, id }) => {
            setActiveChatUserName(nombre);
            setActiveChatUserId(id);
        })

        socket.on('agregar-nueva-conversacion', (data) => {
            console.log(data);
            loadConversations([...conversations, data])
        })

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('usuarios-activos');
            socket.off('recibir-mensajes');
            socket.off('mensaje-privado');
            socket.off('escribiendo-mensaje');
            socket.off('agregar-nueva-conversacion');
        };
    }, []);

    useEffect(() => {
        const notificationAudio = new Audio('http://192.168.1.34:8000/new_message.mp3')
        if(newMessageReceived){
            if (currentConversation) {
                if (newMessageReceived.conversation_id === currentConversation) {
                    loadMessages([...chatMessages, newMessageReceived]);
                    setNewMessageReceived(undefined)
                } else {
                    notificationAudio.play()
                }
            }else{
                notificationAudio.play()
            }
        }
    }, [newMessageReceived])


    useEffect(() => {
        if (currentConversation) fetchMessages();
    }, [currentConversation])

    useEffect(() => {
        scrollToBottom()
    }, [chatMessages]);

    useEffect(() => {
        let timeout: any;
        if (activeChatUserName.length > 1) {
            scrollToBottom()
            timeout = setTimeout(() => {
                setActiveChatUserName('')
            }, 3000);
        };
        return () => {
            clearTimeout(timeout)
        }
    }, [activeChatUserName])

    return {
        //* Valores
        newMessage,
        activeChatUserName,
        activeChatUserId,
        currentConversation,
        currentReceiver,
        messagesEndRef,
        messageToNewConversation,
        newMessageReceived,

        //*Metodos
        setCurrentConversation,
        setMessageToNewConversation,
        setCurrentReceiver,
        setNewMessage,
        setNewMessageReceived,
        onClickSend,
        onLogout,
        onWritingMessage,
    }
}
