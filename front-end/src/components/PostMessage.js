import React, { useState, useEffect } from 'react'
import { Timestamp } from "./Timestamp"
import { useSelector, useDispatch } from 'react-redux'
import { postMessages, fetchMessages } from 'reducers/messages';
import { Card, Button, TextField, Label } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components'

const Main = styled.div`
& {
.postMessage {
  background: #f1f1f1;
  margin: 10px;
  width: 400px;
}
.avatar {
  background: black;
}
.input-field{
  width: 100%;
  margin: 5px;
}
}
`

const Rotate = styled.div`
& {
  .expand {
    transform: rotate(0deg);
    margin-left: auto;
  }
  .expandOpen {
    transform: rotate(180deg);
  }
}
`
export const PostMessage = () => {
  const [message, setMessage] = useState("")
  const [author, setAuthor] = useState("")
  const [expanded, setExpanded] = useState(false)

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(postMessages());
  // }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(postMessages({ message, author }))
    dispatch(fetchMessages());
    // setMessage("")
    // setAuthor("")
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Main>
      <Card className="postMessage">
        <CardHeader
          avatar={
            <Avatar className="avatar" aria-label="author">
              Y
          </Avatar>
          }
          title="Start a new discussion"
          subheader="remember be kind"
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <TextField
              className="input-field"
              label="New message"
              id="outlined-multiline-static"
              multiline
              rows={4}
              variant="outlined"
              type="message"
              required
              value={message}
              onChange={event => setMessage(event.target.value)}
            />
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <TextField
              className="input-field"
              label="Author"
              type="author"
              variant="outlined"
              required
              value={author}
              onChange={event => setAuthor(event.target.value)}
            />
          </Typography>
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Post
        </Button>
        </CardContent>
        <Rotate>
          <IconButton
            className={expanded ? "expandOpen" : "expand"}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Rotate>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Replies:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and
              set aside for 10 minutes.
          </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Main>

    // <CardContent>
    //   Message
    //   <Input
    //     type="message"
    //     required
    //     value={message}
    //     onChange={event => setMessage(event.target.value)}
    //   />
    //       Author
    //   <Input
    //     type="author"
    //     required
    //     value={author}
    //     onChange={event => setAuthor(event.target.value)}
    //   />
    //   <Button type="submit" onClick={handleSubmit}>
    //     Post
    //     </Button>
    // </CardContent>
    // </Card >
  )
}