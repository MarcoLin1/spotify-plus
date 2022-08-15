import { Button } from 'react-bootstrap'
import React from "react"
import styled from '@emotion/styled'

const Container = styled.div`
  min-height: 100vh;
`

export default function Login () {
  const url = process.env.REACT_APP_AUTH_URL
  return (
    <Container className='d-flex justify-content-center align-items-center'>
      <Button className='btn-success' href={url}>
        Login Spotify
      </Button>
    </Container>
  )
}