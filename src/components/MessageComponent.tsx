import React, { useContext } from 'react'
import styled from 'styled-components';
import { AppContext } from '../context/AppContext';

interface MessageProps {
  from: string | undefined;
  name: string;
  message: string;
  fecha: Date;
  img:string;
}

interface SpanStyledProps {
  from: string | undefined;
  uid: string | null;

}


export const MessageComponent = ({ from, name, message, fecha, img }: MessageProps) => {

  const { state } = useContext(AppContext);
  const { uid } = state;

  return (
    <p style={{
      margin:'5px',
      display: 'flex',
      justifyContent: uid === from ? 'right' : 'left',
      alignItems:'flex-end',
      position:'relative'
    }}>
      { (from !== uid ) && <Avatar src={ img }/> }
      <SpanStyled from={from} uid={uid}>
        {
          //(from !== uid) && <OwnerMessage>{ name }</OwnerMessage>
        }
        { message }
        <DateMessageText from={from} uid={uid} >{new Date(fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</DateMessageText>
      </SpanStyled>
    </p>

  )
}

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  clip-path: circle();
  background-color: #808080;
  margin-right: 5px;
`

const SpanStyled = styled.span<SpanStyledProps>`
  min-height: 20px;
  min-width: 50px;
  max-width: 60%;
  border-radius: 12px;
  background-color:${({ uid, from }) => uid === from ? '#038cfc' : '#d8d8d8'};
  color:${({ uid, from }) => uid === from ? '#f0f0f0' : '#444444'};
  padding: 5px 10px;
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 15px;
  margin-right: 10px;
`
const OwnerMessage = styled.span`
  font-weight: bold;
  color: #353535;
  margin-bottom: 5px;
`

const DateMessageText = styled.span<SpanStyledProps>`
    /* position: absolute; */
    align-self: flex-end;
    font-size: 10px;
    color:${({ uid, from }) => uid === from ? '#fff' : '#999999'};
`