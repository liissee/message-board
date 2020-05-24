import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMessages } from 'reducers/messages';
import { Card } from '@material-ui/core';
import styled from 'styled-components'
import { PostMessage } from './PostMessage';
import { PostReply } from './PostReply';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Timestamp } from 'components/Timestamp'
import { ToggleComments } from './ToggleComments';

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

const Rotate = styled.div`
& {
  .expand {
    transform: rotate(0deg);
    margin-left: auto;
    background: red;
  }
  .expandOpen {
    transform: rotate(180deg);
    background: green;
  }
}
`

export const ShowMessages = (props) => {
  const [expanded, setExpanded] = useState(false)

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const messages = useSelector((state) => state.messages.messages)
  console.log(expanded)

  const childMessages: IMessage[] = messages.filter(
    (message: IMessage) => message.parentId === currentMessage.id
  );

  // const indexFalse = () => {
  //   setExpanded(messages.map((message, index) => { index: false }));
  //   messages.forEach(message => expanded.push({ messageId: message._id, index: false }))
  // }
  // indexFalse()

  // messages.forEach(message => expanded.push({ index: false })) //I suppose you can get an id or similar identifers
  // console.log(index)

  const handleExpandClick = () => {
    setExpanded(!expanded);
    // setExpanded({ expanded: index })
  };


  // const selectedMessageId = messages._id;
  // const isMessageSelected = messages._id === selectedMessageId;
  // console.log("id", messages._id)
  // console.log("selecetd", isMessageSelected)

  return (
    <Main>

      <PostMessage />
      {messages.map((message, index) => (
        <Card className="messageCard" key={message._id} id={message._id} selected={index}>
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
            <Typography variant="body2" color="textSecondary" component="div">
              Message: {message.message}
            </Typography>
            <PostReply parentId={message._id} />
            <ToggleComments parentId={message._id} />
          </CardContent>
          <Rotate>
            <IconButton
              className={expanded ? "expandOpen" : "expand"}
              onClick={handleExpandClick}
              // onClick={() => setExpanded({ expanded: index })}
              // selected={this.determineItemStyle(i)}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Rotate>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>Replies:</Typography>
              <Typography>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron and
                set aside for 10 minutes.
          </Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))
      }
    </Main >


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