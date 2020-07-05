import React from 'react'

export default ({isError, errorMsg}) => {

  return isError ? (
    <div className="error">{errorMsg}</div>
  ) : null
}