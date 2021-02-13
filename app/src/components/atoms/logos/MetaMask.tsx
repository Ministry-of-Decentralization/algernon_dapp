import React from 'react'
import BaseIcon from './Base'
import metamaskIcon from '../../../logos/metamask.svg'

const MetaMask = ({size = 1}) => (
  <BaseIcon
    src={metamaskIcon}
    alt='MetaMAsk Icon'
    size={size}
  />
)

export default MetaMask