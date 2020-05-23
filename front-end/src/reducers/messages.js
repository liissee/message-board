import { createSlice } from '@reduxjs/toolkit'
import { ui } from 'reducers/ui'

export const messages = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    setMessage: (state, action) => {
      state.messages = action.payload
    },
    setPostedMessage: (state, action) => {
      //  state = action.payload
      state.message.push(action.payload)
    },
    deleteMessage: (state, action) => {
      // Filter out all message but the message with matching id
      state.messages = state.messages.filter(message => message._id !== action.payload)
    }
  }
})


//GET MESSAGES
export const fetchMessages = () => {
  return dispatch => {
    fetch('http://localhost:8080/messages')
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        if (json[0]) {
          const replies = function (json, root) {
            const nestedMessages = {};
            json.forEach(message => {
              Object.assign(nestedMessages[message._id] = nestedMessages[message._id] || {}, message);
              nestedMessages[message.parentId] = nestedMessages[message.parentId] || {};
              nestedMessages[message.parentId].children = nestedMessages[message.parentId].children || [];
              nestedMessages[message.parentId].children.push(nestedMessages[message._id]);
            });
            return nestedMessages[root].children;
          }(json, null);
          dispatch(messages.actions.setMessage(replies));
          console.log(replies)
        } else {
          dispatch(messages.actions.setMessage(json));
        }
      });
  };
};


//POST MESSAGES
export const postMessages = ({ message, author, parentId }) => {
  return dispatch => {
    fetch("http://localhost:8080/messages", {
      method: "POST",
      body: JSON.stringify({ message, author, parentId }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        console.log("author", author)
        dispatch(messages.actions.setPostedMessage(message, author, parentId));
        dispatch(messages.actions.setMessage(message));
      })
      .catch(() => {
        console.log("Failed to post message")
      })
  }
};

// DELETE MESSAGE
export const deleteMessage = ({ id, author, userId }) => {
  return dispatch => {
    dispatch(ui.actions.setLoading(true))
    const accessToken = localStorage.getItem('accessToken')
    const userId = localStorage.getItem('userId')

    fetch(`http://localhost:8080/messages/${id}`, {
      method: 'DELETE',
      statusCode: 204,
      body: JSON.stringify({ id, author, userId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken
      }
    })
      .then(() => {
        dispatch(messages.actions.deleteMessage({ id, author, userId }))
        console.log(id, author, userId)
        dispatch(ui.actions.setLoading(false))
      })
  }
}
