import React from 'react'
import { Flex as FlexUI } from 'rimble-ui'

const Flex = (props) => {
  return (
    <FlexUI {...props} >
      {props.children}
    </FlexUI>
  )
}

export default Flex
