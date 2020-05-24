import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMessages } from 'reducers/messages';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components/macro'
import Tooltip from '@material-ui/core/Tooltip';


export const DeleteMessage = ({ id, author }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.users.accessToken)
  const userId = useSelector((state) => state.users.userId)
  //Check if the logged in user is the same as the author
  const isAllowed = author === userId

  const handleRemove = (event) => {
    event.preventDefault()
    dispatch(deleteMessages({ id, author }))
  }

  return (
    <div>
      <Tooltip title="Delete message">
        {accessToken && isAllowed && (
          <IconButton disabled={!accessToken} aria-label="delete" onClick={handleRemove}>
            <DeleteIcon />
          </IconButton>
        )}
      </Tooltip>
    </div>
  )
}
