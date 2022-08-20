import styled from '@emotion/styled'
import Sidebar from './Sidebar'
import Body from './Body'


const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.backgroundColor};
`

export default function Dashboard ({ code }) {

  return (
    <Container>
      <Sidebar />
      <Body code={code}/>
    </Container>
  )
}