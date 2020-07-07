import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'

export default ({mutation, mutationVariables, handleResponse, label, disabled}) => {
  const {mutationTrigger, loading, response, error, requestFinished} = mutation()
  useEffect(() => {
    if (requestFinished) {
      handleResponse(response, error)
    }
  }, [loading])
  const onClick = () => mutationTrigger({variables: mutationVariables})
  return (
    <Button variant='contained' onClick={onClick} color="primary" type='button' disabled={disabled}>
      {label}
    </Button>
  )
}