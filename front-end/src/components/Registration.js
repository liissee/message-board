import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import styled from 'styled-components'



export const Registration = () => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [registred, setRegistred] = useState(false)
  const [failure, setFailure] = useState(false)

  const handleSubmit = event => {
    event.preventDefault();
    fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify({ userName, email, password }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (res.status !== 201) {
          return (
            res.json().then(json => console.log(json.message)), setFailure(true)
          )
        } else {
          setRegistred(true)
          setTimeout(reDirect, 2000);
        }
      })
      .catch(err => console.log("Error:", err))
  }

  const reDirect = () => {
    // history.push(`/login`)
  }

  return (
    <div>
      {registred &&
        <div color={"#fff"}>Success! Continuing to login...</div>
      }
      {!registred && (
        <div>
          {!failure && <div>CREATE NEW USER</div>}
          {failure && (
            <div>
              User not created. Try using another name or email!
            </div>
          )}
          {userName.length < 2 && userName.length !== 0 && " is too short"}
          {userName.length > 20 && " is too long"}
          <TextField
            variant="outlined"
            margin="normal"
            id="name"
            label="User name"
            name="name"
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
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            type="text"
            value={email}
            onChange={event => setEmail(event.target.value.toLowerCase())}
          ></TextField>
          <div>
            {password.length < 5 && password.length !== 0 && " is too short"}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            ></TextField>
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={
              userName.length > 1 &&
                userName.length < 21 &&
                password.length > 4 &&
                email
                ? false
                : true
            }
            onClick={handleSubmit}
          >
            SIGN UP
            </Button>
          <Button
            variant="contained"
            color="primary"
            type="button" onClick={reDirect}>
            Already a member?
            </Button>
        </div>
      )}
    </div>
  )
}