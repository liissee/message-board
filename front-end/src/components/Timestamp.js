import React from 'react';
import moment from "moment"

export const Timestamp = (props) => {

  return (
    <> {moment(props.createdAt).format("LL")}</>
  )
}

