import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
import styled from 'styled-components'

export const Loading = () => {
    return (
        <Container>
            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#038cfc"
                ariaLabel="three-dots-loading"
                visible={true}
            />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
`
