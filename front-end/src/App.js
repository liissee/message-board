import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { messages } from 'reducers/messages'
import { ui } from 'reducers/ui'
import { users } from 'reducers/users'
import { MessageBoard } from './components/MessageBoard'
import styled from 'styled-components/macro'

const reducer = combineReducers({
  messages: messages.reducer,
  users: users.reducer,
  ui: ui.reducer
})



const store = configureStore({ reducer })

const Main = styled.div`
/* display: flex;
flex-direction: column;
justify-content: center;
align-items: center; */
`

export const App = () => {
  return (
    <Main>
      <Provider store={store}>
        <MessageBoard />
      </Provider>
    </Main>
  )
}
