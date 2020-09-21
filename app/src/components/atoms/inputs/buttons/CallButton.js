import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { MutationStore } from 'apollo-client/data/mutations'

export default ({mutation, callVariables, handleResponse, label, disabled}) => {
  const onClick = () => mutation()
  return (
    <Button variant='contained' onClick={onClick} color="primary" type='button' disabled={disabled}>
      {label}
    </Button>
  )
}