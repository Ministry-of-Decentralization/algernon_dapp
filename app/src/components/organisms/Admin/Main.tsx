import React from 'react'
import Paper from '../../atoms/Paper'
import TagsAdmin from '../Tags/TagsAdmin'
import Roles from '../../molecules/admin/Roles'

interface AdminMainProps {
  connectedAddress: any
  algernonInstance: any
  tags: any
  isAdmin: boolean
  isTagger: boolean
}

const Main = ({connectedAddress, algernonInstance, isAdmin, isTagger, tags}: AdminMainProps) => {

  return (
    <div style={{padding: '2em'}}>
      <Paper style={{marginBottom: '1em', padding: '1em'}}>
        <TagsAdmin connectedAddress={connectedAddress}  algernonInstance={algernonInstance} tags={tags} isTagger={isTagger} />
      </Paper>
      <Paper style={{marginBottom: '1em', padding: '1em'}}>
        <Roles address={connectedAddress} algernonInstance={algernonInstance} isAdmin={isAdmin} />
      </Paper>
    </div>
  )
}


export default Main