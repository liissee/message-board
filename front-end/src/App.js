import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { messages } from 'reducers/messages'
import { ShowMessages } from './components/ShowMessages'

const reducer = combineReducers({
  messages: messages.reducer,
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <div>
      <Provider store={store}>
        <ShowMessages />
      </Provider>
    </div>
  )
}
