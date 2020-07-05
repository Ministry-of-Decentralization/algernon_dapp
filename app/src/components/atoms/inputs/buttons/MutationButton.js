import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'

export default ({mutation, mutationVariables, handleResponse, label, disabled}) => {
  const {mutationTrigger, loading, response, error, requestFinished} = mutation()
  console.log(`inside mut button finished ${requestFinished}\n${JSON.stringify(mutationVariables, null, 2)}`)
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