import styled from "styled-components"

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const TitleContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    h2{
        color:${({theme})=> theme.title }
    }
    a{
        position:absolute;
        left: 10px;
        color:${({theme})=> theme.title }
    }
`

export const StyledForm = styled.form`
    /* background: rgba( 255, 255, 255, 0.45 ); */
    background-color: ${ props => props.theme.background_semi_transparent };
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 11px );
    -webkit-backdrop-filter: blur( 11px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    width: 500px;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 10px;
    h2{
        text-align: center;
    }
    @media screen and (max-width: 600px) {
        width: 90%;
    }
`