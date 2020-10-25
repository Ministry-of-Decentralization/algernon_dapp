import React from 'react'
import TopicList from '../Topics/TopicList'
import CreateTopic from '../forms/CreateTopic'
import { topicsToOptions } from '../../atoms/inputs/optionsFormatters'
import BlockieAddress from '../../molecules/user/BlockieAddress'

const Profile = ({address, connectedAddress, algernonInstance, tagOptions, topics, refetchTopics, unlockedContract}) => {
  const create = address === connectedAddress ?
    tagOptions.length ?
      <CreateTopic
        connectedAddress={connectedAddress}
        algernonInstance={algernonInstance}
        tagOptions={tagOptions}
        topicOptions={topicsToOptions(topics)}
        refetchTopics={refetchTopics}
       />
        :
        'loading create topic'
      :
      null

  return (
    <div>
  
        <BlockieAddress address={address} />

      {create}
      <h3>Courses</h3>
      { topics != null ? <TopicList topics={topics} /> : 'loading'}

    </div>
  )
}

export default Profile