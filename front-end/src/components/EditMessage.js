import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editMessages } from 'reducers/messages';
import styled from 'styled-components/macro'
import EdiText from "react-editext";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Tooltip from '@material-ui/core/Tooltip';

const Main = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  
& {
  .message-text {
    font-family: source-code-pro, Monaco, Consolas, "Courier New", monospace;
  }
}
`
const StyledEdiText = styled(EdiText)`
&{
.message-text {
  font-family: source-code-pro, Monaco, Consolas, "Courier New", monospace;
  color: black;
  }
  button[editext="edit-button"], button[editext="save-button"], button[editext="cancel-button"] {
    border: none;
    background: none;
    &:hover {
      background: none;
    }
  }
  input, textarea {
    font-family: source-code-pro, Monaco, Consolas, "Courier New", monospace;
    color: darkgoldenrod;
    font-weight: bold;
    border-radius: 5px;
  }
}
`

export const EditMessage = ({ id, author, message }) => {
  const [newValue, setNewValue] = useState()
  const [editing, setEditing] = useState(false);

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.users.accessToken)
  const userId = useSelector((state) => state.users.userId)
  //Check if the logged in user is the same as the author
  const isAllowed = author === userId

  const handleEdit = (newValue) => {
    setNewValue(newValue)
    dispatch(editMessages({ id, author, newValue }))
  }

  return (
    <Main>
      <div>
        {accessToken && isAllowed
          ? <StyledEdiText
            value={message}
            validationMessage="Please type at least 1 character."
            validation={val => val.length > 0}
            type="textarea"
            onSave={handleEdit}
            editing={editing}
            hideIcons={true}
            editButtonContent={<Tooltip title="Edit message"><IconButton><EditIcon size="small" /></IconButton></Tooltip>}
            saveButtonContent={<Tooltip title="Save"><IconButton><CheckRoundedIcon size="small" /></IconButton></Tooltip>}
            cancelButtonContent={<Tooltip title="Cancel"><IconButton><CloseRoundedIcon size="small" /></IconButton></Tooltip>}
            showButtonsOnHover
            viewProps={{
              className: 'message-text',
              style: { borderRadius: 3 }
            }}
            inputProps={{
              className: 'textarea',
              placeholder: 'Type your content here',
              style: {
                outline: 'none',
                minWidth: 'auto'
              },
              rows: 3
            }} />
          : <div className="message-text">{message}</div>
        }
      </div>
    </Main>
  )
}
