import React from 'react'
import ReactQuill from 'react-quill'

import 'react-quill/dist/quill.snow.css';


export default (props) => (
  <div style={{paddingBottom: '1.25em'}}>
    <ReactQuill
      value={props.value}
      readOnly={true}
      theme={"bubble"} />
  </div>
)
