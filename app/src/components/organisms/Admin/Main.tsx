import React from 'react'
import TagList from '../Tags/TagList'
import CreateTagForm from '../forms/CreateTag'

interface AdminMainProps {
  connectedAddress: any
  algernonInstance: any
  tags: any
}

const Main = ({connectedAddress, algernonInstance, tags}: AdminMainProps) => {

  return (
    <div>
    <CreateTagForm connectedAddress={connectedAddress}  algernonInstance={algernonInstance} />
    <TagList tags={tags} />
    </div>
  )
}


export default Main