import React from 'react'
import TopicList from '../Topics/TopicList'
import CreateTopic from '../forms/CreateTopic'
import ProfileInfo from './ProfileInfo'
import { topicsToOptions } from '../../atoms/inputs/optionsFormatters'

const Profile = ({address, connectedAddress, tagOptions, topics, refetchTopics, user, refetchUser, userLoading, unlockedContract}) => {
  const create = address === connectedAddress ?
    tagOptions.length ?
      <CreateTopic
        connectedAddress={connectedAddress}
        tagOptions={tagOptions}
        topicOptions={topicsToOptions(topics)}
        refetchTopics={refetchTopics}
       />
        :
        'loading'
      :
      null

  return (
    <div>
      {!userLoading ? 
        <ProfileInfo
          connectedAddress={connectedAddress}
          user={user}
          refetchUser={refetchUser}
          unlockedContract={unlockedContract} />
        :
        'Loading...'
      }
      {create}
      <h3>Courses</h3>
      { topics != null ? <TopicList topics={topics} /> : 'loading'}

    </div>
  )
}

export default Profile