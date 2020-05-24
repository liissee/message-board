import React from 'react'
import { useSelector } from 'react-redux'
import Loader from 'react-loader-spinner'
import styled from 'styled-components/macro'

const Main = styled.div`
margin: 20px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export const LoadingIndicator = () => {
  const isLoading = useSelector((state) => state.ui.isLoading)

  return (
    <Main>
      {isLoading && (
        <Loader type="ThreeDots" color="#f2acad" height={80} width={80} />
      )}
    </Main>
  )
}