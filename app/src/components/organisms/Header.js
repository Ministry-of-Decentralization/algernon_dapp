import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
`

const Title = styled.div`
  text-decoration: none;
  font-size: 1.9em;
`
const Header = () => (
  <HeaderDiv>
    <Link to='/'>
      <Title>Algernon</Title>
    </Link>
  </HeaderDiv>
)

export default Header