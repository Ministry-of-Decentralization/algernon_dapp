import React from 'react'
import TopicListItem from '../../molecules/topics/ListItem'
import { Topic as TopicType } from 'theGraphTypes';

interface TopicListProps {
  topics: TopicType[]
}
const TopicList = ({ topics }:TopicListProps) => {
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