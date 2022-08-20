import { ImHome3, ImSearch, ImList2 } from "react-icons/im"
import React from "react"
import SidebarOptions from "./SidebarOptions"
import styled from '@emotion/styled'
import '../scss/Sidebar.scss'

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0.2;
  padding-left: 10px;
  padding-right: 10px;
  min-width: 170px;
  height: 100vh;
  color: white;
  background-color: #040404;
`

export default function Sidebar () {
  return (
    <SidebarContainer>
      <img 
        className="sidebar-logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" 
        alt=""
      />
      <SidebarOptions Icon={ImHome3} option='Home' />
      <SidebarOptions Icon={ImSearch} option='Search' />
      <SidebarOptions Icon={ImList2} option='Library' />
    </SidebarContainer>
  )
}