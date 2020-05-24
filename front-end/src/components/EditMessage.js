import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editMessages } from 'reducers/messages';
import { Button } from '@material-ui/core';
import styled from 'styled-components'
import EdiText from "react-editext";


export const EditMessage = ({ id, author, message }) => {
  const [newValue, setNewValue] = useState()
  const [editing, setEditing] = useState(false);

  const dispatch = useDispatch();

  const handleEdit = (newValue) => {
    setNewValue(newValue)
    dispatch(editMessages({ id, author, newValue }))
  }

  return (
    <div>
      <EdiText
        value={message}
        type="text"
        onSave={handleEdit}
        editing={editing}
      />
      <Button variant="contained" onClick={() => setEditing(!editing)}>Edit</Button>

      {/* <EdiText
        value={message}
        type="textarea"
        inputProps={{ rows: 5 }}
        onSave={handleEdit}
        editing={editing}
        hideIcons={true}
        saveButtonContent="Save"
        cancelButtonContent="Cancel"
        editButtonContent="Edit message"
      /> */}
    </div>
  )
}
