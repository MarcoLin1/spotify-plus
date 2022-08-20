import React from "react"
import styled from '@emotion/styled'
import SpotifyLogo from '../images/Spotify_Logo_RGB_Green.png'

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.backgroundColor};
`

const Button = styled.a`
  background-color: ${({ theme }) => theme.buttonBackgroundColor};
  border-radius: 8px;
  padding: 8px 16px;
  margin-top: 32px;
  border: none;
  font-size: 16px;
  color: ${({ theme }) => theme.titleColor};
  text-decoration: none;
  
  &:hover {
    color: ${({ theme }) => theme.titleColor};
  }
`

const Logo = styled.img`
  max-width: 400px;
  margin-bottom: 32px;
`

export default function Login () {
  const url = process.env.REACT_APP_AUTH_URL
  return (
    <Container className='d-flex flex-column justify-content-center align-items-center'>
      <Logo src={SpotifyLogo}/>
      <Button href={url}>
        Login Spotify
      </Button>
    </Container>
  )
}