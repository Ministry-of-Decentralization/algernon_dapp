import React from 'react'
import Paper from '../../atoms/Paper'
import CreateTagForm from '../forms/CreateTag'

interface AdminMainProps {
  connectedAddress: any
  algernonInstance: any
  tags: any
}

const Main = ({connectedAddress, algernonInstance, tags}: AdminMainProps) => {

  return (
    <div style={{padding: '2em'}}>
    <Paper>
      <CreateTagForm connectedAddress={connectedAddress}  algernonInstance={algernonInstance} tags={tags} />
    </Paper>

    </div>
  )
}


export default Main