import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { replyMessage } from 'reducers/messages';
import { Card, Input, Button } from '@material-ui/core';
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

export const ReplyMessage = ({ parentId }) => {
  const [message, setMessage] = useState("")
  const [author, setAuthor] = useState("")
  const dispatch = useDispatch();

  const messages = useSelector((state) => state.messages.messages)
  console.log(messages)

  // useEffect(() => {
  //   dispatch(postMessages());
  // }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(replyMessage({ message, author, parentId }))
  }


  return (
    <div>
      <Form>
        Comment
      <input
          type="message"
          required
          value={message}
          onChange={event => setMessage(event.target.value)}
        />
        {/* Author
      <input
        type="author"
        required
        value={author}
        onChange={event => setAuthor(event.target.value)}
      /> */}
      </Form>

      <Button variant="contained" type="submit" onClick={handleSubmit}>
        Post comment
        </Button>
      <RepliesWrapper>
        <div>Message: {message.message}</div>
        <div>Author: {message.author}</div>
        <div>Time: {message.createdAt}</div>
      </RepliesWrapper>
    </div>
  )
}
