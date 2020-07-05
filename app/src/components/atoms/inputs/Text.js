import React from 'react'
import { useField } from 'formik'
import TextField from '@material-ui/core/TextField'
import ErrorMessage from './ErrorMessage';

export default (props) => {
  const [field, meta] = useField(props);
  const isError = meta.touched && !!meta.error
  return (
    <div style={{paddingBottom: '1.25em'}}>
      <TextField
        {...field}
        {...props}
        error={isError} />
      <ErrorMessage
        isError={isError}
        errorMsg={meta.error} />
    </div>
  )

}