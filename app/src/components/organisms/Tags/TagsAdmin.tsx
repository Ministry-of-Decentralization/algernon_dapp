import React from 'react'
import CreateTagForm from '../forms/CreateTag'

interface TagsAdminProps {
  connectedAddress: string
  algernonInstance: any
  tags: any
  isTagger: boolean
}
const TagsAdmin = ({connectedAddress, algernonInstance, tags, isTagger}: TagsAdminProps) => {
  return (
    <div>
      <h3>Tags</h3>
      { isTagger ?
        <CreateTagForm connectedAddress={connectedAddress} algernonInstance={algernonInstance} tags={tags} />
        :
        'You must be granted Tagger role to update tags.'
      }
    </div>
  )
}

export default TagsAdmin