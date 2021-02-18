import React from 'react'
import Box from '../../atoms/Box'
import LoadingCircle from '../../atoms/Loading'

const LoadingCard = ({ message }) => (
  <Box>
    <Box>
      {message}
    </Box>
    <LoadingCircle />
  </Box>
)

export default LoadingCard