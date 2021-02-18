import React from 'react'

const ErrorMessage = ({isError, errorMsg}) => {

  return isError ? (
    <div className="error">{errorMsg}</div>
  ) : null
}

export default ErrorMessage