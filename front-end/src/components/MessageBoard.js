import React from 'react'
import { ShowMessages } from 'components/ShowMessages'
import { PostMessage } from 'components/PostMessage'
import styled from 'styled-components/macro'
import { Header } from './Header'

const Flex = styled.div`
/* display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: flex-start; */
`
const Main = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export const MessageBoard = () => {

  return (
    <Flex>
      <Header />
      <Main>
        <PostMessage />
        <ShowMessages />
      </Main>
    </Flex>
  )
}
