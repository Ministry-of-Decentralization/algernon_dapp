import React from 'react'
import Icon from '@material-ui/icons/UnfoldMore'

const StakeIcon = (props) => {
  const fontSize = props.size || "medium"
  const color = props.color || "primary"
  return (
    <Icon
      fontSize={fontSize}
      color={color}
      onClick={props.onClick}
    />
  )
}

export default StakeIcon