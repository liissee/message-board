import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMessages } from 'reducers/messages';
import { Card } from '@material-ui/core';
import styled from 'styled-components'
import { PostMessage } from './PostMessage';
import { ReplyMessage } from './PostReply';
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
    background: red;
  }
  .expandOpen {
    transform: rotate(180deg);
    background: green;
  }
}
`

// const Rotate = styled.div`
//   transform: ${props => (props.id ? "rotate(0deg)" : "rotate(180deg)")};
//     background: ${props => (props.id ? "red" : "green")};
//   `

export const ShowMessages = (props) => {
  const [expanded, setExpanded] = useState(false)
  const [isOpen, setIsOpen] = useState([]);
  const [messages, setMessages] = useState([]);


  //GET MESSAGES
  useEffect(() => {
    fetch('http://localhost:8080/messages')
      .then((res) => res.json())
      .then((json) => {
        setMessages(json);
        console.log(json)
        // json.forEach(message => isOpen.push({ messageId: message._id, messageText: message.message, index: false })) //I suppose you can get an id or similar identifers

        setIsOpen(json.map((message, index) => (index = false)));
      });
  }, [])


  // const handleDropdownClick = e => {
  //   e.preventDefault();
  //   const currentID = e.currentTarget.id;
  //   const newIsOpenState = isOpen[id] = !isOpen[id];
  //   setIsOpen(newIsOpenState);
  // };

  // const handleDropdownClick = index => {
  //   const expanded = isOpen;
  //   expanded[index] = !expanded[index];
  //   setIsOpen(expanded);
  // }
  // const [selectedPost, setSelectedPost] = useState({})
  console.log("isopen", isOpen)

  // const dispatch = useDispatch();

  // const handleExpandClick = () => {
  //   setExpanded({ selectedItem: i })
  // };


  // useEffect(() => {
  //   dispatch(fetchMessages());
  // }, [dispatch]);

  // const messages = useSelector((state) => state.messages.messages)


  // const indexFalse = () => {
  // setExpanded(messages.map((message, index) => { index: false }));
  // messages.forEach(message => expanded.push({ messageId: message._id, index: false }))
  //I suppose you can get an id or similar identifers
  // }
  // indexFalse()

  console.log(messages[0])

  // const handleDropdownClick = ({ e, messageId, index }) => {
  //   console.log(messageId, index)

  //   const currentID = e.currentTarget.messageId;
  //   console.log(currentID)
  //   const newIsOpenState = isOpen[currentID] = !isOpen[currentID];
  //   setIsOpen(newIsOpenState);
  // };

  const handleDropdownClick = (index) => {
    const clicked = isOpen;
    clicked[index] = !clicked[index];
    setIsOpen(clicked);
    console.log(index)

    console.log("clicked", clicked)
    console.log("isope ", isOpen[index])
  };

  // const handleDropdownClick = ({ e, index }) => {
  //   const currentOpenState = isOpen;
  //   const clickedLink = e.target.index // use your own identifier
  //   currentOpenState[clickedLink].index = !currentOpenState[clickedLink].index;
  //   setIsOpen(currentOpenState);
  //   console.log("clicked", clickedLink)
  //   console.log("isopen+index ", isOpen[index])
  // }
  // const selectedMessageId = messages._id;
  // const isMessageSelected = messages._id === selectedMessageId;
  // console.log("id", messages._id)
  // console.log("selecetd", isMessageSelected)

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  return (
    <Main>
      <PostMessage />
      {messages.map((message, index) => (
        <Card className="messageCard" key={message._id} id={index}>
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
            <ReplyMessage parentId={message._id} />
          </CardContent>
          <Rotate>
            <IconButton
              className={isOpen ? "expandOpen" : "expand"}
              onClick={handleDropdownClick}
              // onClick={() => setIsOpen(isOpen[index])}
              // selected={this.determineItemStyle(i)}
              aria-expanded={isOpen}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Rotate>

          <Collapse in={isOpen[index]} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>Replies:</Typography>
              <Typography>
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