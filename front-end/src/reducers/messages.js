import { createSlice } from '@reduxjs/toolkit'

export const messages = createSlice({
  name: 'messages',
  initialState: {
    messages: []
  },
  reducers: {
    setMessage: (state, action) => {
      state.messages = action.payload
    },
    setPostedMessage: (state, action) => {
      state = action.payload
    },
    setReplyMessage: (state, action) => {
      state = action.payload
    }
  }
})

//GET MESSAGES
export const fetchMessages = () => {
  return dispatch => {
    fetch('http://localhost:8080/messages')
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        dispatch(messages.actions.setMessage(json));
      });
  };
};

//POST MESSAGES
export const postMessages = ({ message, author }) => {
  return dispatch => {
    fetch("http://localhost:8080/messages", {
      method: "POST",
      body: JSON.stringify({ message, author }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        dispatch(messages.actions.setPostedMessage(message, author));
      })
      .catch(() => {
        // dispatch(messages.actions.setPostedMessage({ error: 'Failed to post message' }));
        console.log("Failed to post message")
      })
  }
};

//       .then(res => {
//         dispatch(messages.actions.setPostedMessage({ message, author }));
//         console.log(message)
//       })
//       .catch(console.log("Failed to post message"))
//   };
// };

//POST REPLY
export const replyMessage = ({ message, author, id }) => {
  return dispatch => {
    fetch(`http://localhost:8080/messages/${id}/reply`, {
      method: "POST",
      body: JSON.stringify({ message, author, id }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        dispatch(messages.actions.setReplyMessage({ message, author, id }));
        console.log(message)

      })
      .catch(console.log("Failed to reply"))
  };
};




