import React from 'react'
import Paper from '@material-ui/core/Paper'

const PaperComp = props => 
  <Paper style={props.style ? props.style : {padding: 16}}>
    {props.children}
  </Paper>

export default PaperComp