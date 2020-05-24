import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMessages } from 'reducers/messages';
import styled from 'styled-components/macro'
import { MessageCard } from './MessageCard';
import moment from "moment"
import { LoadingIndicator } from './Loading';

const Main = styled.div`
`
const Text = styled.div`
margin: 20px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export const ShowMessages = (props) => {
  const dispatch = useDispatch();

  // const userName = useSelector((state) => state.users.userName)
  const messages = useSelector((state) => state.messages.messages)
  const loading = useSelector(state => state.ui.isLoading)

  useEffect(() => {
    dispatch(fetchMessages());
    console.log(messages)
  }, [dispatch]);


  return (
    <Main>
      {loading && <LoadingIndicator />}
      <Text>
        {!loading && (messages < 1) && <div>Currently no posted messages</div>}
      </Text>
      {messages.map(message => (
        <MessageCard
          key={message._id}
          id={message._id}
          author={message.author}
          message={message.message}
          createdAt={moment(message.createdAt).format('ll')}
          children={message.children}
        />
      ))}
    </Main>
  )
}

