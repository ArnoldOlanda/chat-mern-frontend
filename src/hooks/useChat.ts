import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import Swal from 'sweetalert2';
import { ChatApi } from '../api/ChatApi';
import { AppContext } from '../context/auth/AppContext';
import { ConversationsContext } from '../context/conversations/ConversationsContext';
import { MessagesContext } from '../context/messages/MessagesContext';
import { ConversationsResponse, Message, User } from '../interfaces';

let socket: Socket;

export const useChat = () => {

    const navigate = useNavigate();

    const { state, logoutUser } = useContext(AppContext);
    const { state: messagesState, loadMessages, startLoadingMessages } = useContext(MessagesContext);
    const { state: conversationsState, loadConversations, loadUsers, setActiveChatId, setActiveChatName } = useContext(ConversationsContext)

    const { uid, conversations, username, img } = state
    const { chatMessages } = messagesState;
    const { currentConversation, currentReceiver } = conversationsState;

    const [newMessage, setNewMessage] = useState('');
    const [newMessageReceived, setNewMessageReceived] = useState<Message>();
    const [messageToNewConversation, setMessageToNewConversation] = useState(false);

    const onLogout = () => {
        logoutUser('');
        socket.disconnect();
        localStorage.removeItem('token');
        navigate('/auth/login');
    }

    const onClickSend = async () => {
        if (!currentConversation) {
            Swal.fire('Enviar mensaje', 'Debes seleccionar primero un chat', 'error');
            return;
        }
        setActiveChatName('')

        const message: Message = {
            mensaje: newMessage,
            fecha: new Date(),
            conversation_id: currentConversation,
            sender: { _id: uid, nombre: username, img },
        }
        loadMessages([...chatMessages, message])

        const payload = {
            ...message,
            sender: uid,
            currentReceiver
        }

        socket.emit('enviar-mensaje', payload);
        setNewMessage('');
        setActiveChatName('');

        const { data } = await ChatApi.put<ConversationsResponse>(`/conversation/${currentConversation}`, { senderId: uid });
        loadConversations(data.conversations);

        if (messageToNewConversation) {
            socket.emit('nueva-conversacion', { id: currentConversation, receiver: currentReceiver });
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

        startLoadingMessages();

        const { data } = await ChatApi.get(`/mensajes/${currentConversation}`);

        loadMessages(data.mensajes);
    }

    useEffect(() => {
        fetchConversations();
        // socket = io('http://192.168.1.34:8000', {
        socket = io('https://chat-mern.onrender.com', {
            extraHeaders: { "x_token": localStorage.getItem('token') || "" }
        });

        socket.on('connect', () => { console.log('sockets online') });
        socket.on('disconnect', () => { console.log('sockets offline') });

        socket.on('usuarios-activos', (users: User[]) => {
            loadUsers(users);
        });

        socket.on('recibir-mensajes', ({ mensaje, conversations }) => {
            setNewMessageReceived(mensaje)
            if (conversations) {
                loadConversations(conversations)
            }
        })


        socket.on('escribiendo-mensaje', ({ nombre, id }) => {
            setActiveChatName(nombre);
            setActiveChatId(id);
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
        const notificationAudio = new Audio('https://chat-mern.onrender.com/new_message.mp3')
        if (newMessageReceived) {
            if (currentConversation) {
                if (newMessageReceived.conversation_id === currentConversation) {
                    loadMessages([...chatMessages, newMessageReceived]);
                    setNewMessageReceived(undefined)
                } else {
                    notificationAudio.play()
                }
            } else {
                notificationAudio.play()
            }
        }
    }, [newMessageReceived])

    useEffect(() => {
        if (currentConversation) fetchMessages();
    }, [currentConversation])

    return {
        //* Valores
        newMessage,
        messageToNewConversation,
        newMessageReceived,

        //*Metodos
        setMessageToNewConversation,
        setNewMessage,
        setNewMessageReceived,
        onClickSend,
        onLogout,
        onWritingMessage,
    }
}
