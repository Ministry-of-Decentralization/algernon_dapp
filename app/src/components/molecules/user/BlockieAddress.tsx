import React from 'react'
import Blockie from '../../atoms/Blockie'
import Address from '../../atoms/Address'
import Box from '../../atoms/Box'

const BlockieAddress = ({ address }: { address: String }) => (
  <Box>
    <Blockie address={address} size={10} scale={5} />
    <div style={{margin:'0 0 0 0.25em', fontSize: '1.75em'}}>
      <Address address={address} length={6} />
    </div>
  </Box>
)

export default BlockieAddress