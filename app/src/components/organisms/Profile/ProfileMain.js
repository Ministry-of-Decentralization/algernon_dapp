import React from 'react'
import TopicList from '../Topics/TopicList'
import CreateTopic from '../forms/CreateTopic'
import ProfileInfo from './ProfileInfo'
import { topicsToOptions } from '../../atoms/inputs/optionsFormatters'

const Profile = ({address, connectedAddress, algernonInstance, tagOptions, topics, refetchTopics, user, refetchUser, userLoading, unlockedContract}) => {
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
      {!userLoading && user ? 
        <ProfileInfo
          connectedAddress={connectedAddress}
          user={user}
          refetchUser={refetchUser}
          unlockedContract={unlockedContract} />
        :
        <div>Address {address}</div>
      }
      {create}
      <h3>Courses</h3>
      { topics != null ? <TopicList topics={topics} /> : 'loading'}

    </div>
  )
}

export default Profile