import styled from "styled-components"
import { ChatContentDivProps } from "../interfaces"

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
    position: relative;
    
`
export const TopContent = styled.div`
    width: 60%;
    display: flex;
    align-items:center;
    padding: 0 15px;
    @media screen and (max-width: 1370px) {
        width: 80%;
        max-width: 80%;
    }
    @media screen and (max-width: 1024px) {
        width: 95%;
        max-width: inherit;
    }
    h3{
        flex:1
    }
    button{
        justify-self: flex-end;
        background-color: #afddfc;
        border: none;
        width: 100px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 10px;
    }
`
export const MainContentDiv = styled.div`
    position: relative;
    width: 60%;
    display: flex;
    min-height: 90vh;
    max-height: 80vh;
    border-radius: 20px;
    overflow: hidden;
    /* background: rgba( 255, 255, 255, 0.45 ); */
    background: ${ props => props.theme.background };
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 11px );
    -webkit-backdrop-filter: blur( 11px );
    @media screen and (max-width: 1370px) {
        width: 80%;
        max-width: 80%;
    }
    @media screen and (max-width: 1024px) {
        width: 95%;
        max-width: inherit;
    }
`
export const ChatContainerDiv = styled.div<ChatContentDivProps>`
    position: relative;
    /* background-color: rgb(241, 241, 241); */
    background: ${ props => props.theme.background };
    width: 70%;
    padding:0 10px;
    height: 100%;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px ;
    /* transition: background-color .3s ease-in-out; */
    @media screen and (max-width: 600px) {
        width: 100%;
        &::after{
            content: '';
            position: absolute;
            top:0;
            left:0;
            width: 100%;
            height: 100%;
            background-color: ${({ collapsed }) => collapsed ? 'transparent' : '#2222225c'};
            z-index:${({ collapsed }) => collapsed ? '-1' : '100'};
        }
    }
`