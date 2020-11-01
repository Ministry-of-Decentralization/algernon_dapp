import React from 'react'
import Chip from '../../atoms/Chip'
import Link from '../../atoms/Link'

const TagBadges = ({ tags }) => {
  return tags.map(
    tag => <Link key={tag.id} id={tag.tag} to={`/tags/${tag.id}`} element={<Chip style={{cursor: 'pointer'}} label={tag.tag} />} />
  )
}

export default TagBadges