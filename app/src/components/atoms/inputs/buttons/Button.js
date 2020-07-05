import React from 'react'
import Button from '@material-ui/core/Button'

export default ({onClick = () => {}, label, type = 'button'}) =>
  <Button variant='contained' onClick={onClick} color="primary" type={type} >
    {label}
  </Button>