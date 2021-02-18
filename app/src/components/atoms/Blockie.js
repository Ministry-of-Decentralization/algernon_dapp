import React from 'react'
import Blockies from 'react-blockies';

 const Blockie = ({address, size, scale}) => (

  <Blockies
    seed={address}
    size={size || 9}
    scale={scale || 5}
  />

)

export default Blockie