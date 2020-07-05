import React from 'react'
import Chip from '../../atoms/Chip'
import { Link } from 'react-router-dom'

const TagList = ({tags}) => {

  const getChip = (tag) => {
    const link =   <Link to={`/tags/${tag.id}`}>{tag.tag}</Link>
    return <Chip key={tag.id} label={link} />
  }
  
  const chips = tags.map(getChip)
  return (
    <div>
      <h2>Tags</h2>
      <div>{chips}</div>
    </div>
  )
}

export default TagList