import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../reducers/users.js'
import styled from 'styled-components/macro'
import { Button, TextField } from '@material-ui/core'

const Main = styled.div`
width: 350px;
padding: 10px;
& {
  .buttons {
    margin-top: 5px;
    display: flex; 
    justify-content: space-between;
  }
.signIn {
  font-size: 13px;
}
}
`

export const Login = ({ handleClick }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const failed = useSelector(state => state.ui.isLoginFailed)

  const handleSignin = (event) => {
    event.preventDefault()
    dispatch(fetchUser({ userName, password }))
  }


  return (
    <Main>
      <div className="signIn">Please identify yourself to post a message</div>
      <div>
        <TextField
          color="secondary"
          className="textfields"
          variant="outlined"
          margin="dense"
          label="User name"
          required
          fullWidth
          size="small"
          type="text"
          value={userName}
          onChange={event => setUserName(event.target.value)}
        ></TextField>
        <TextField
          color="secondary"
          className="textfields"
          variant="outlined"
          margin="dense"
          size="small"
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        ></TextField>
      </div>
      {failed && <div className="signIn">Incorrect user and/or password.</div>}
      <div className="buttons">
        <Button
          size="small"
          variant="contained"
          color="secondary"
          type="submit"
          onClick={handleSignin}
        >
          SIGN IN
        </Button>
        <Button
          size="small"
          variant="contained"
          type="button" onClick={handleClick}>
          Not a member?
        </Button>
      </div>
    </Main>
  )
}
