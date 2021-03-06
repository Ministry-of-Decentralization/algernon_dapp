import React from 'react'
import TopicList from '../Topics/TopicList'
import CreateTopic from '../forms/CreateTopic'
import { topicsToOptions } from '../../atoms/inputs/optionsFormatters'
import BlockieAddress from '../../molecules/user/BlockieAddress'
import TokenBalances from './TokenBalances'

const Profile = ({address, connectedAddress, algernonInstance, algerTokenInstance, tagOptions, topics, refetchTopics, refetchUser, user}) => {
  const create = address === connectedAddress && algernonInstance ?
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
      <TokenBalances
        user={user}
        connectedAddress={connectedAddress}
        algerTokenInstance={algerTokenInstance}
        to={algernonInstance && algernonInstance.options.address}
        refetchUser={refetchUser} />

      {create}
      <h3>Courses</h3>
      { topics != null ? <TopicList topics={topics} /> : 'loading'}

    </div>
  )
}

export default Profile