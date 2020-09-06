import React from 'react'
import TagList from './TagList'
import CreateTagForm from '../forms/CreateTag'

const Tags = ({connectedAddress, algernonInstance, tags}) => {

  return (
    <div>
      { connectedAddress && <CreateTagForm connectedAddress={connectedAddress}  algernonInstance={algernonInstance} /> }
    < TagList tags={tags} />
    </div>
  )
}


export default Tags