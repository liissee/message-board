import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { postMessages, fetchMessages } from 'reducers/messages';
import { TextField, Button } from '@material-ui/core';
import styled from 'styled-components'

const Form = styled.div`
  padding: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction:column;
`
const RepliesWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  font-size: 10px;
`

export const PostReply = ({ parentId }) => {
  const [message, setMessage] = useState("")
  // const [author, setAuthor] = useState("")
  const dispatch = useDispatch();

  // const messages = useSelector((state) => state.messages.messages)
  const author = useSelector((state) => state.users.userId)

  // console.log(parentId)

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(postMessages({ message, author, parentId }))
    dispatch(fetchMessages());
    //Clear inputfield
  }

  return (
    <div>
      <Form>
        <TextField
          className="input-field"
          label="New comment"
          id="outlined-multiline-static"
          multiline
          rows={2}
          variant="outlined"
          type="message"
          required
          value={message}
          onChange={event => setMessage(event.target.value)}
        />
        {/* <TextField
          className="input-field"
          label="Author"
          id="outlined-multiline-static"
          variant="outlined"
          type="author"
          required
          value={author}
          onChange={event => setAuthor(event.target.value)}
        /> */}
      </Form>

      <Button variant="contained" type="submit" onClick={handleSubmit}>
        Post comment
        </Button>
    </div>
  )
}
