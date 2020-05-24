import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Registration } from 'components/Registration'
import { Login } from 'components/Login'
import { useSelector } from 'react-redux'
import { Logout } from './Logout'
import { Button } from '@material-ui/core'



const Main = styled.div`
padding: 20px;
display:flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
background: lightgoldenrodyellow;
`
const HeaderContent = styled.div`
  background: lightgoldenrodyellow;
  font-size: 50px;
  font-family: source-code-pro, Monaco, Consolas, "Courier New", monospace;
`
const Navigation = styled.div`

`

export const Header = () => {
  const [showRegistration, setRegistrationShow] = useState(false)
  const [showLogin, setLoginShow] = useState(false)

  const accessToken = useSelector((state) => state.users.accessToken)

  const handleClick = () => {
    setLoginShow(!showLogin)
    setRegistrationShow(!showRegistration)
  }



  return (
    <Main>
      <HeaderContent>
        MESSAGE BOARD
      </HeaderContent>
      <Navigation>
        {!accessToken &&
          <>
            <div>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => setLoginShow(!showLogin)}>Login</Button>
            </div>
            <>
              {showRegistration && (
                <Registration handleClick={handleClick} />
              )
              }
              {showLogin && (
                <Login handleClick={handleClick} />
              )}
            </>
          </>
        }
        {accessToken &&
          <Logout />
        }
      </Navigation>
    </Main >
  )
}
