import React,{ useContext } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom';
import { Container, StyledForm, TitleContainer } from '../styled-components/layout';

interface Props {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    title: string;
    goBack?: boolean;
    children: JSX.Element | JSX.Element[]
}

export const AuthLayout = ({ onSubmit, title, goBack, children }: Props) => {
    return (
        <Container>
            <StyledForm onSubmit={onSubmit}>
                <TitleContainer>
                    {
                        goBack
                            ? <Link to={'/auth/login'}><IoArrowBackOutline size={20} /></Link>
                            : ''
                    }
                    <h2>{title}</h2>
                </TitleContainer>
                {children}
            </StyledForm>
        </Container>
    )
}

