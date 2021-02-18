import React from 'react'
import BaseIcon from './Base'
import fortmaticIcon from '../../../logos/fortmatic.svg'

const Fortmatic = ({size = 1}) => (
  <BaseIcon
    src={fortmaticIcon}
    alt='Fortmatic Icon'
    size={size}
  />
)

export default Fortmatic