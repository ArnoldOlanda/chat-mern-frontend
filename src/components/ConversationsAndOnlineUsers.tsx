import React,{ useContext } from 'react'
import styled from 'styled-components';
import { IoCloseOutline } from 'react-icons/io5'
import { AppContext } from '../context/AppContext';
import { Conversation, ConversationResponse, ConversationsResponse, Member, Message, User } from '../interfaces';
import { ChatApi } from '../api/ChatApi';

interface Props{
    onlineUsersCollapsed:boolean;
    currentConversation:string | undefined;
    newMessageReceived: Message | undefined;
    setOnlineUsersCollapsed: React.Dispatch<React.SetStateAction<boolean> >;
    setCurrentConversation: React.Dispatch<React.SetStateAction<string | undefined> >;
    setCurrentReceiver: React.Dispatch<React.SetStateAction<string | undefined> >;
    setMessageToNewConversation: React.Dispatch<React.SetStateAction<boolean> >
}

export const ConversationsAndOnlineUsers = ({ 
    onlineUsersCollapsed, 
    currentConversation,
    newMessageReceived, 
    setOnlineUsersCollapsed, 
    setCurrentConversation, 
    setCurrentReceiver,
    setMessageToNewConversation
}:Props) => {

    const { state, setChatTitle,loadConversations } = useContext(AppContext);

    const { uid, activeUsers, conversations } = state;

    const onClickActiveUserItem = async (user:User) => {
        try {
            const userUid = user.uid;
            let conversation: Member|undefined;

            for(let i = 0; i<= conversations.length-1; i++ ){
                conversation = conversations[i].members.find((member:Member)=>  member._id === userUid)
                if(conversation){
                    setCurrentConversation(conversations[i].uid)
                    setCurrentReceiver(conversation._id)
                    setChatTitle(conversation.nombre)
                    break;
                }    
            }
        
            if(!conversation){
                const { data } = await ChatApi.post<ConversationResponse>('/conversation',{
                    senderId: uid,
                    receiverId: user.uid
                })
                const {conversation} = data
                const friendName = conversation.members.filter((member: Member) => member._id !== uid);

                loadConversations([...conversations,conversation])
                setCurrentConversation(conversation.uid)
                setCurrentReceiver(friendName[0]._id)
                setChatTitle(friendName[0].nombre)

                //Marcar como nueva conversacion
                setMessageToNewConversation(true)
            }

            setOnlineUsersCollapsed(true);
        } catch (error) {
            console.log(error);
        }
    }

    const onClickConversation = async (e:Conversation, friendName: Member[]) => {
        setCurrentConversation(e.uid);
        setChatTitle(friendName[0].nombre);
        setCurrentReceiver(friendName[0]._id);
        setOnlineUsersCollapsed(true);

        const {data} = await ChatApi.put<ConversationsResponse>(`/conversation/${e.uid}`,{senderId: uid});
        loadConversations(data.conversations);
    }

    return (
        <OnlineUserContainerDiv collapsed={onlineUsersCollapsed}>
            <div>
                <h4 style={{ paddingLeft: '10px' }}>Usuarios conectados</h4>
                {
                    !onlineUsersCollapsed
                    && <span onClick={() => setOnlineUsersCollapsed(true)}>
                        <IoCloseOutline size={20} />
                    </span>
                }
            </div>
            <span style={{ marginLeft: '10px', marginTop: '10px' }}><b>Chats</b></span>
            <ListContainer>
                {
                    conversations.map((e: Conversation) => {
                        const friendName = e.members.filter((member: Member) => member._id !== uid);

                        return (
                            <ListItem
                                key={e.uid}
                                onClick={()=> onClickConversation( e, friendName ) }
                                active={e.uid === currentConversation}
                            >
                                <Avatar src={friendName[0].img} />
                                <UsernameSpan>
                                    {
                                        (e.new_messages && e.uid === newMessageReceived?.conversation_id && e.uid !== currentConversation)
                                        ?(<b>{friendName[0].nombre}</b>)
                                        : friendName[0].nombre
                                    }
                                </UsernameSpan>
                            </ListItem>
                        )
                    })
                }
            </ListContainer>

            <span style={{ marginLeft: '10px' }}><b>Usuarios activos</b></span>
            <ListContainer>
                {
                    activeUsers.map((e: User) => (
                        <ListItem 
                            key={e.uid}
                            onClick={() => onClickActiveUserItem(e) } 
                        >
                            <Avatar src={e.img} />
                            <Indicador />
                            <UsernameSpan>{e.nombre}</UsernameSpan>
                        </ListItem>
                    ))
                }
            </ListContainer>
        </OnlineUserContainerDiv>
    )
};

interface OnlineUsersDivProps {
    collapsed: boolean;
}

interface StyledListItemProps{
    active?:boolean
}

const OnlineUserContainerDiv = styled.div<OnlineUsersDivProps>`
    background-color: rgb(238, 238, 238);
    width: 30%;
    height: 100%;
    position: relative;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px ;
    transition: transform .3s ease;
    div{
        display: flex;
        align-items: center;
        justify-content: space-around;
        span{
            width: 25px;
            height: 25px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 5px;
        }
        span:active{
            background-color: #797979;
        }
    }
    
    @media screen and (max-width: 600px) {
        position: absolute;
        z-index: 10000;
        background-color: #ffffff;
        border-radius: 20px;
        width: 50%;
        transform:${({ collapsed }) => collapsed ? 'translateX(-100%)' : 'translateX(0)'};
    }
`
const ListContainer = styled.ul`
    padding-left: 0;
    padding-right: 0;
    margin: 0;
    margin-bottom: 20px;
`


const ListItem = styled.li<StyledListItemProps>`
    display: flex;
    position: relative;
    align-items: center;
    padding-left: 20px;
    background-color: ${({active})=> active ? '#c0c0c0':'transparent' };
    text-decoration: none;
    gap: 5px;
    width: 100%;
    height: 50px;
    /* margin-bottom: 10px; */
    transition: all .1s ease-in-out;
    cursor: pointer;
    /* &:hover{
        background-color: #c0c0c0;
    } */
    @media screen and (max-width: 1024px) {
        width: 80%;
        max-width: 80%;
        font-size: 15px;
    }
    
`

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  clip-path: circle();
  background-color: #808080;
  margin-right: 10px;
  position: relative;
`
const Indicador = styled.span`
    position: absolute;
    top: 5px;
    left: 50px;  
    width: 14px;
    height: 14px;
    background-color: green;
    border-radius: 50%;
`
const UsernameSpan = styled.span`
    /* @media screen and (max-width: 600px) {
        display: none;
    } */
`
