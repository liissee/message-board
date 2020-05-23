import React from 'react'
import styled from 'styled-components'
import { Registration } from 'components/Registration'
import { Login } from 'components/Login'
import { useSelector } from 'react-redux'
import { Logout } from './Logout'


const Main = styled.div`
background: lightgoldenrodyellow;
`

export const Header = () => {
  const accessToken = useSelector((state) => state.users.accessToken)

  return (
    <Main>
      {!accessToken &&
        <>
          <Registration />
          <Login />
        </>
      }
      {accessToken &&
        <Logout />
      }
    </Main >
  )
}
