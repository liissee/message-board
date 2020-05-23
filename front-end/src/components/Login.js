import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../reducers/users.js'
import styled from 'styled-components'
import { Button, TextField } from '@material-ui/core'



export const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)
  // const history = useHistory();
  const dispatch = useDispatch()
  const failed = useSelector(state => state.ui.isLoginFailed)

  const handleSignin = (event) => {
    event.preventDefault()
    console.log(userName)
    dispatch(fetchUser({ userName, password }))
  }

  const reDirect = () => {
    // history.push(`/register`)
  }


  return (
    <div>
      <div>SIGN IN</div>
      <div>
        <TextField
          variant="outlined"
          margin="normal"
          label="User name"
          required
          fullWidth
          type="text"
          value={userName}
          onChange={event => setUserName(event.target.value)}
        ></TextField>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        ></TextField>
      </div>
      {failed && <p>Incorrect user and/or password.</p>}
      <div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSignin}
        >
          SIGN IN
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="button" onClick={reDirect}>
          Not a member?
        </Button>
      </div>
    </div>
  )
}
