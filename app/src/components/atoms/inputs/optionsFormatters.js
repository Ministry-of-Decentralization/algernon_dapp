import React from 'react'
export const stringsToOptions = (list) => list.map((item, idx) => ({value: idx, label:item}))

export const topicsToOptions = (topics) => topics.map(topic => {
  const label = (
    <div>
      <h5>{topic.title} </h5> {topic.description}
    </div>
  )
  return {
    value: topic.id,
    label
  }
})

export const tagsToOptions = (tags) => tags.map(tag => ({value: tag.id, label:tag.tag}))