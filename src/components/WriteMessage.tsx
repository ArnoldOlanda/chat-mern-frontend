import React from 'react'
import styled from 'styled-components'
import { MdSend } from 'react-icons/md'

interface Props {
    newMessage: string;
    setNewMessage: React.Dispatch<React.SetStateAction <string> >;
    onClickSend: () => void;
    onWritingMessage: () => void;
}

export const WriteMessage = ({
    newMessage,
    setNewMessage,
    onClickSend,
    onWritingMessage,
}: Props) => {
    
    return (
        <WriteMessageContainer>
            <StyledInput
                type="text"
                name='message'
                placeholder='Write a message...'
                value={newMessage}
                autoComplete='off'
                onChange={({ target }) => setNewMessage(target.value)}
                onKeyUp={(e) => {
                    (e.key === 'Enter')
                        ? onClickSend()
                        : onWritingMessage()
                }}
            />
            <StyledButton onClick={onClickSend}>
                <MdSend size={20} color='white' />
            </StyledButton>
        </WriteMessageContainer>
    )
}

const WriteMessageContainer = styled.div`
    display:flex;
    gap:5px;
    height: 50px;
    
`
const StyledInput = styled.input`
    flex:1;
    border-radius: 50px;
    border: none;
    background-color: ${ ({ theme }) => theme.input_bg };
    outline: none;
    padding-left: 25px;
    font-size: 15px;
`
const StyledButton = styled.button`
    background-color: #038cfc;
    border:none;
    width: 50px;
    height: 50px;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    
`