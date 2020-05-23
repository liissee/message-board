import React from 'react'
import { useDispatch } from 'react-redux'
import { users } from '../reducers/users'
import styled from 'styled-components'
import { Button } from '@material-ui/core'



export const Logout = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(users.actions.removeAccessToken(""))
    dispatch(users.actions.removeUserName(""))
    dispatch(users.actions.removeUserId(""))
  }


  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleLogout}>
      Sign out
    </Button>
  )
}

