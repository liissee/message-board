import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMessages } from 'reducers/messages';
import { Card } from '@material-ui/core';
import styled from 'styled-components'
import { PostMessage } from './PostMessage';
import { ReplyMessage } from './ReplyMessage';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Timestamp } from 'components/Timestamp'

const Main = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
& {
.messageCard {
  margin: 10px;
  width: 400px;
}
}
`
// const Card = styled.div`
// width: 400px;
// /* border: 1px solid lightgrey; */
// `

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

export const ShowMessages = (props) => {
  const [expanded, setExpanded] = useState(false)
  // const [selectedPost, setSelectedPost] = useState({})

  const dispatch = useDispatch();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const messages = useSelector((state) => state.messages.messages)
  console.log(messages)

  // const handleExpandClick = e => {
  //   e.preventDefault();
  //   // const currentID = e.currentTarget.id;
  //   console.log(messages._id)
  //   const newExpandedState = expanded[messages._id] = !expanded[messages._id];
  //   // setIsOpen(newExpandedState);
  //   setExpanded(newExpandedState);
  // };


  return (
    <Main>
      <PostMessage />
      {messages.map((message) => (
        <Card className="messageCard" key={message._id} >
          <CardHeader
            avatar={
              <Avatar aria-label="author">
                R
          </Avatar>
            }
            title={message.author}
            subheader={<Timestamp createdAt={message.createdAt} />}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Message: {message.message}
              <ReplyMessage id={message._id} />
            </Typography>
          </CardContent>
          <Rotate>
            <IconButton
              // toggleOpen={expanded[message._id]}
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
      ))}
    </Main>


    // <MessageBox>
    //   <PostMessage />

    //   {messages.map((message) => (
    //     <Card className="messageCard" key={message._id}>
    //       <div>Message: {message.message}</div>
    //       <div>Author: {message.author}</div>
    //       <div>Time: {message.createdAt}</div>
    //       <ReplyMessage id={message._id} />

    //     </Card>
    //   ))}
    // </MessageBox>
  )
}