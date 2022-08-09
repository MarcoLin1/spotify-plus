import { Button } from 'bootstrap'
import React from "react"
import styled from '@emotion/styled'

const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=ffd0971592a943e59c99cb881680c7c4&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'

const Container = styled.div`
  min-height: 100vh;
`

export default function Login () {
  return (
    <Container className='d-flex justify-content-center align-items-center'>
      <Button className='btn-success' href={AUTH_URL}>
        Login Spotify
      </Button>
    </Container>
  )
}