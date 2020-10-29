import React from 'react'
import TopicList from '../Topics/TopicList'

const TagDetail = ({tag}) => 
  <div>
    <h1>{tag.tag} courses</h1>
    <TopicList topics={tag.topics} />
  </div>


export default TagDetail

