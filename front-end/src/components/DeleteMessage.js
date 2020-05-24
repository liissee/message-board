import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteMessages } from 'reducers/messages';
import { Button } from '@material-ui/core';
import styled from 'styled-components'


export const DeleteMessage = ({ id, author }) => {
  const dispatch = useDispatch();

  const handleRemove = (event) => {
    event.preventDefault()
    console.log(id, author)
    dispatch(deleteMessages({ id, author }))
  }

  return (
    <div>
      <Button variant="contained" type="submit" onClick={handleRemove}>
        Delete
        </Button>
    </div>
  )
}
