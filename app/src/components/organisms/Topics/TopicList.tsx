import React from 'react'
import TopicListItem from '../../molecules/topics/ListItem'
import { SelectedTopic } from '../../../selectors/types';

interface TopicListProps {
  topics: SelectedTopic[]
}
const TopicList = ({ topics }: TopicListProps) => {
  return (
    <div>
      {topics.length ?
        topics.map(topic => <TopicListItem key={topic.id} {...topic} />)
        : 'No Courses'
      }
    </div>
  )
}

export default TopicList