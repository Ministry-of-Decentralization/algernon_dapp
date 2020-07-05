import React from 'react'
import CloseIcon from '@material-ui/icons/Close'

/*
interface IconProps {
  size?: string,
  color?: string,
  onClick: () => void
}
*/React
export default (props) => {
  const fontSize = props.size || "medium"
  const color = props.color || "primary"
  return (
    <CloseIcon
      fontSize={fontSize}
      color={color}
      onClick={props.onClick}
    />
  )
}