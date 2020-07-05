import React from 'react'
import Paper from '../../atoms/Paper'
import Box from '../../atoms/Box'


export default ({ leftEl, rightEl }) => (
  <Paper>
    <Box>
      <Box
        width="50%"
        flexDirection={"column"}
      >
        {leftEl}
      </Box>
      <Box
        width="50%"
        flexDirection={"column"}
      >
        {rightEl}
      </Box>
    </Box>
  </Paper>
)