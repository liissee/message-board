// import React, { useState, useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { fetchMessages } from 'reducers/messages';
// import { Card } from '@material-ui/core';
// import styled from 'styled-components'
// import CardHeader from '@material-ui/core/CardHeader';
// import CardContent from '@material-ui/core/CardContent';
// import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { Timestamp } from 'components/Timestamp'

// const Main = styled.div`
// display: flex;
// flex-direction: column;
// justify-content: center;
// align-items: center;
// & {
// .messageCard {
//   margin: 10px;
//   width: 400px;
// }
// }
// `

// // const Rotate = styled.div`
// // & {
// //   .expand {
// //     transform: rotate(0deg);
// //     margin-left: auto;
// //   }
// //   .expandOpen {
// //     transform: rotate(180deg);
// //   }
// // }
// // `

// const Rotate = styled.div`
//   transform: ${props => (props.selected ? "rotate(0deg)" : "rotate(180deg)")};
//     background: ${props => (props.selected ? "red" : "green")};

//   `

// export const ToggleComments = ({ parentId }) => {
//   const [expanded, setExpanded] = useState(false)
//   const [isOpen, setIsOpen] = useState({});


//   const dispatch = useDispatch();

//   const messages = useSelector((state) => state.messages.messages)


//   return (
//     <>
//     </>
//   )
// }