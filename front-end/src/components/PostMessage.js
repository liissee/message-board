import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postMessages, fetchMessages } from 'reducers/messages';
import { Card, Button, TextField } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components/macro'

const Main = styled.div`
& {
.postMessage {
  background: #f1f1f1;
  margin: 10px;
  width: 400px;
  }
.avatar {
  background: black;
  }
.input-field{
  width: 100%;
  margin-bottom: 5px;
  }
}
`
export const PostMessage = () => {
  const [message, setMessage] = useState()

  // save the logged in userId to author in User mongoose model.
  const author = useSelector((state) => state.users.userId)
  const accessToken = useSelector((state) => state.users.accessToken)

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(postMessages({ message, author, parentId: null }))
    dispatch(fetchMessages());
    setMessage("")
  }

  return (
    <Main>
      <Card className="postMessage">
        <CardHeader
          avatar={
            <Avatar className="avatar" aria-label="author">
              Y
          </Avatar>
          }
          title="Start a new discussion"
          subheader="remember be kind"
        />

        <CardContent>
          <TextField
            color="secondary"
            className="input-field"
            label="New message"
            id="outlined-multiline-static"
            multiline
            rows={4}
            variant="outlined"
            type="message"
            required
            value={message}
            onChange={event => setMessage(event.target.value)}
          />
          <Button variant="contained" disabled={!accessToken} type="submit" onClick={handleSubmit}>
            Post
        </Button>
        </CardContent>
      </Card>
    </Main>
  )
}