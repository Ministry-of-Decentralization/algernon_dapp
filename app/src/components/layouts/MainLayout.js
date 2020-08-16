import React, {Fragment} from 'react'
import Flex from '../atoms/Flex'
import Box from '../atoms/Box'

export default ({ header, sidebar, main }) =>
  <Fragment>
    <Flex>
      <Box justifyContent="center">{header}</Box>
    </Flex>
    <div style={{ display: 'flex', direction: 'row', marginTop: '1em' }}>
      <div style={{ width: '15%', backgroundColor: '#edf1f5' }}>
        {sidebar}
      </div>
      <div style={{ width: '80%', paddingLeft: '2.5%', marginTop: '1.5em' }}>
        {main}
      </div>
    </div>
  </Fragment>
