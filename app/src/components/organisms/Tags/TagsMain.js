import React from 'react'
import TagList from './TagList'
import CreateTagForm from '../forms/CreateTag'

const Tags = ({connectedAddress, tags}) => 
  <div>
    <CreateTagForm connectedAddress={connectedAddress} />
    <TagList tags={tags} />
  </div>


export default Tags