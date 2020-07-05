import React from 'react'
import Blockie from '../../atoms/Blockie'
import Address from '../../atoms/Address'
import Box from '../../atoms/Box'
import Link from '../../atoms/Link'


const Badge = ({address, username}) => (
  <Box>
    <Blockie address={address} />
    <div style={{margin:'0 0 0 0.25em'}}>
      <Link to={`/profile/${address}`} element={<Address address={address} length={4} />} />
      {username}
    </div>
  </Box>
)

export default Badge