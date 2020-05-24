import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMessages } from 'reducers/messages';
import { Card, Button } from '@material-ui/core';
import styled from 'styled-components'
import { PostReply } from './PostReply';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Timestamp } from 'components/Timestamp'
import { DeleteMessage } from './DeleteMessage';
import { EditMessage } from './EditMessage';

const Main = styled.div`
/* display: flex;
flex-direction: column;
justify-content: center;
align-items: center; */
& {
.messageCard {
  margin: 10px;
  width: 400px;
  }
.replyContainer {
  padding: 0px;
  padding-bottom: 0;
  margin: 0px;
}
.replyCard {
  border: lightgrey solid 1px;
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

export const ShowMessages = (props) => {
  const [expanded, setExpanded] = useState(true)

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);


  const userName = useSelector((state) => state.users.userName)
  const messages = useSelector((state) => state.messages.messages)

  // const childMessages: IMessage[] = messages.filter(
  //   (message: IMessage) => message.parentId === currentMessage.id
  // );



  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  // const selectedMessageId = messages._id;
  // const isMessageSelected = messages._id === selectedMessageId;
  // console.log("id", messages._id)
  // console.log("selecetd", isMessageSelected)

  return (
    <Main>
      {messages.map((message, index) => (
        <Card className="messageCard" key={message._id} selected={index}>
          <CardHeader
            avatar={
              <Avatar aria-label="author">
                R
          </Avatar>
            }
            title={message.author}
            subheader={<Timestamp createdAt={message.createdAt} />}
          />
          <DeleteMessage id={message._id} author={message.author} />
          <EditMessage id={message._id} author={message.author} />
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              Message: {message.message}
            </Typography>
            <PostReply parentId={message._id} />
            {/* <ToggleComments parentId={message._id} /> */}
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
            <CardContent className="replyContainer">
              {message.children && message.children.length && message.children.length > 0 && message.children.map((reply) => (
                <CardContent key={reply._id} className="replyCard">
                  <CardHeader
                    avatar={
                      <Avatar aria-label="author">
                        R
                  </Avatar>
                    }
                    title={userName}
                    subheader={<Timestamp createdAt={reply.createdAt} />}
                  />
                  <Typography variant="body2" color="textSecondary">{reply.message}</Typography>
                </CardContent>
              ))}
            </CardContent>
          </Collapse>
        </Card>
      ))
      }
    </Main>
  )
}