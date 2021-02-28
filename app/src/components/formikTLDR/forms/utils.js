export const callMethod = (props) => {
  console.log(`calling methods ${JSON.stringify(props)}`)
  props.contractMethod.call(null, ...props.args).send({from: props.connectedAddress, value: '0'})
    .on('transactionHash', props.handleTxHash)
    .on('receipt', (receipt) => {
      props.handleReceipt(receipt)
      props.resetForm()
      props.setSubmitting(false)
      props.onSuccess && props.onSuccess()
    })
    .on('error', props.handleError)
}

export const formatAddFileVariables = (contentFields, staticValues = {}) => (values) => {
  const allValues = {...staticValues, ...values}
  const contentValues = contentFields.reduce((acc, field) => {
    acc[field] = allValues[field]
    return acc
  }, {})
  return JSON.stringify(contentValues)
}
