import { Link } from "react-router-dom"
import styled from "styled-components"

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    height: 45px;
    margin-bottom: 10px;
    input{
        background-color: #ffffff90;
        outline: none;
        width: 100%;
        height: 100%;
        border: none;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 40px;
        font-size: 16px;
        background-color:${ ({theme})=> theme.input_bg };
        color:${ ({theme})=> theme.text };
    }
`
export const StyledButton = styled.button`
    background-color: ${ props => props.theme.button_bg };
    color:#fff;
    width: 100%;
    height: 45px;
    border-radius: 40px;
    border:none;
    transition: background .3s ease-in-out;
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: 20px;
    &:hover{
        background-color: #1d2ec7;
    }
    &:active{
        background-color: #7086ff;
    }
`

export const RegisterSection = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    user-select: none;
    color: ${ ({theme})=> theme.text };
`
export const RegisterLink = styled(Link)`
    text-decoration: none;
    &:visited{
        color: blue;
    }
`