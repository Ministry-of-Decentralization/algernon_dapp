import React, { useState } from 'react';
import Box from '../../atoms/Box'
import Flex from '../../atoms/Flex'
import Button from '../../atoms/inputs/buttons/Button'

const SwappableBoxForm = ({ defaultContent, getForm, formArgs, defaultLabel, formLabel }) => {
  const [swapped, setSwapped] = useState(false)
  const label = swapped ? formLabel : defaultLabel
  const onSuccess = () => {
    formArgs.onSuccess && formArgs.onSuccess()
    setSwapped(false)
  }
  const swappedContent = getForm({...formArgs, onSuccess})

  return (
    <Box>
      <Flex>
        <Button label={label} onClick={() => setSwapped(!swapped)} />
      </Flex>
      {swapped ? swappedContent : defaultContent}
    </Box>
  )
}

export default SwappableBoxForm