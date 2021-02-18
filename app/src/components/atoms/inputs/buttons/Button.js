import React from 'react'
import Button from '@material-ui/core/Button'

const _Button = ({onClick = () => {}, label, type = 'button', disabled = false, variant = 'contained',  style = {}}) =>
  <Button variant={variant} onClick={onClick} color="primary" type={type} disabled={disabled} style={style}>
    {label}
  </Button>

export default _Button
