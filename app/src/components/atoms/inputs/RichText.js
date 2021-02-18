import React from 'react'
import ReactQuill from 'react-quill'
import { useField } from 'formik'
import 'react-quill/dist/quill.snow.css';
import ErrorMessage from './ErrorMessage';

const RichText = (props) => {
  const [field, meta] = useField(props);
  const isError = meta.touched && !!meta.error

  return (
    <div style={{paddingBottom: '1.25em'}}>
      <ReactQuill
        value={field.value}
        onChange={field.onChange(field.name)} />
      <ErrorMessage
        isError={isError}
        errorMsg={meta.error} />
    </div>
  )
}

export default RichText