import React, { useState } from 'react'
import Box from '../../atoms/Box'
import Flex from '../../atoms/Flex'
import Button from '../../atoms/inputs/buttons/Button'

const SwappableBox = ({ defaultContent, swappedContent, swapLabel, unswapLabel }) => {
  const [swapped, setSwapped] = useState(false)
  const label = swapped ? unswapLabel : swapLabel

  return (
    <Box>
      <Flex>
        <Button label={label} onClick={() => setSwapped(!swapped)} />
      </Flex>
      {swapped ? swappedContent : defaultContent}
    </Box>
  )
}

export default SwappableBox