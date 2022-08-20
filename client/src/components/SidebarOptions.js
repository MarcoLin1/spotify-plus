import React from "react"
import styled from "@emotion/styled"
import '../scss/SidebarOptions.scss'

const SidebarOptionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: grey;
  cursor: pointer;
  transition: color 200ms ease-in;
  margin-bottom: 10%;
  width: 100%;

  &:hover {
    color: white;
  }
`

export default function SidebarOptions({Icon, option}) {
  return (
    <SidebarOptionsContainer>
      <div className="sidebar-option-icon-wrapper">
        {Icon && <Icon className='sidebar-option-icon'></Icon>}
      </div>
      <div className="sidebar-option-text-wrapper">
        {Icon ? <div className="sidebar-option-text">{option}</div> : <p className="sidebar-option-text">{option}</p>}
      </div>
    </SidebarOptionsContainer>
  )
}

