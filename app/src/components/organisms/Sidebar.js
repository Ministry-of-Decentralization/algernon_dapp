import React from 'react'
import styled from  'styled-components'
import { Link } from 'react-router-dom'

const MenuLink = ({url, label}) => (
  <LinkWrapper>
    <Link to={url}>{label}</Link>
  </LinkWrapper>
)

const links = [
  /*
  {
    shouldRender: (address) => !address,
    comp: ButtonLink,
    props: {
      onClick: () => null
    }
  },
  */
  {
    shouldRender: (address) => !!address,
    url: (address) => `/profile/${address}`,
    label: 'My Profile'
  },
  {
    shouldRender: () => true,
    url: () => '/topics',
    label: 'All Courses'
  },
  {
    shouldRender: () => true,
    url: () => '/tags',
    label: 'Tags'
  },
  {
    shouldRender: () => true,
    url: () => '/users',
    label: 'Users'
  }
]

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em 2em;
`

const LinkWrapper = styled.div`
  margin-bottom: 1.5em;
`

const Sidebar = ({ selectedAddress }) => (
    <Menu>
      {links.map(link => link.shouldRender(selectedAddress) ? <MenuLink key={link.url} url={link.url(selectedAddress)} label={link.label} /> : null)}
    </Menu>
  )


export default Sidebar