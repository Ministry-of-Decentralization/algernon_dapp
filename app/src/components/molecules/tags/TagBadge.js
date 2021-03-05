import React from 'react'
import Chip from '../../atoms/Chip'
import Link from '../../atoms/Link'
import Box from '../../atoms/Box'

const TagBadge = ({ tag, stakeTrigger = null}) => {
  const label = (
    <Box alignItems='center'>
      <Link to={`/tags/${tag.id}`} style={{cursor: 'pointer'}} element={<div>{tag.tag}</div>} />
      <div style={{marginLeft: '.6em'}}>{tag.totalStaked}</div>
      {stakeTrigger}
    </Box>
  )
  return <Chip label={label} />
}

export default TagBadge