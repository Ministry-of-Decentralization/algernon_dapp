import React from 'react'

const Address = ({ address, length }) => (

  <div title={address}>
    {length ? `${address.slice(0, length+2)}...${address.slice(length*-1)}`: address}
  </div>

)

export default Address