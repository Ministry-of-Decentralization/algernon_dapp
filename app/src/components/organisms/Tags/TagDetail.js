import React from 'react'
import TopicList from '../Topics/TopicList'

const TagDetail = ({tag}) => 
  <div>
    <h4>{tag.tag} courses</h4>
    <TopicList topics={tag.topics} />
  </div>


export default TagDetail

