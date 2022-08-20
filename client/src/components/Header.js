import { ImSearch } from "react-icons/im"
import styled from "@emotion/styled"
import React from "react"

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  align-items: center;
`

const HeaderLeft = styled.div`
  flex: 0.5;
  min-width: 70px;
  background-color: white;
  color: grey;
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 10px;

  & > input {
    border: none;
    width: 100%;
    outline-style: none;
  }
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;

  & > h4 {
    margin-left: 10px;
  }
`

export default function Header () {
  return (
    <HeaderContainer className="header">
      <HeaderLeft className="header-left">
        <ImSearch />
        <input placeholder="search for artists or songs" type="search"></input>
      </HeaderLeft>
      <HeaderRight className="header-right">
        <div>Avatar</div>
        <h4>Display Name</h4>
      </HeaderRight>
    </HeaderContainer>
  )
}