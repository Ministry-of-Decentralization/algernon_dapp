import React, { useState } from 'react'
import EditIcon from '@material-ui/icons/Edit'
import CancelIcon from '@material-ui/icons/Cancel'

export default ({viewComp, editComp, layoutComp}) => {
  const [editing, setEditing] = useState(false)
  
  const icon = editing ? <CancelIcon onClick={() => setEditing(false)} />: <EditIcon onClick={() => setEditing(true)} />
  return (
    <layoutComp
      viewComp={viewComp}
      editComp={editComp}
      triggerIcon={icon}
    />
  )
}