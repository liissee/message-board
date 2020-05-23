import React from 'react'
// import { messages } from 'reducers/messages'
// import { ui } from 'reducers/ui'
// import { users } from 'reducers/users'
import { ShowMessages } from 'components/ShowMessages'
import { PostMessage } from 'components/PostMessage'
import styled from 'styled-components'
import { Registration } from 'components/Registration'
import { Login } from 'components/Login'
import { useSelector } from 'react-redux'
import { Logout } from './Logout'
import { Header } from './Header'


const Main = styled.div`
/* display: flex;
flex-direction: column;
justify-content: center;
align-items: center; */
`

export const MessageBoard = () => {

  return (
    <Main>
      <Header />
      <PostMessage />
      <ShowMessages />
    </Main >
  )
}
