export const stringsToOptions = (list) => list.map((item, idx) => ({value: idx, label:item}))

export const topicsToOptions = (topics) => topics.map(topic => ({value: topic.id, label:topic.title}))

export const tagsToOptions = (tags) => tags.map(tag => ({value: tag.id, label:tag.tag}))