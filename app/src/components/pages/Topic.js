import React, { useContext, useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../materialDashboard/layouts/Topbar'
import Sidebar from '../materialDashboard/layouts/Sidebar'
import TopicDetail from '../molecules/topics/Detail'
import { useGetTopic, useGetTopics } from '../../queries/topic'
import { theGraphClient } from '../../utils/apolloClient'
import { tagsToOptions, topicsToOptions } from '../atoms/inputs/optionsFormatters'
import { useGetTags } from '../../queries/tag'
import { WalletContext } from '../providers/WalletProvider'
import { useGetUserTopicStake } from '../../queries/stake'

const Topic = ({match: { params: id}}) => {
  id = id.id

  const { algernonInstance, canViewAdmin, address: connectedAddress } = useContext(WalletContext)
  const { stakes: userStakes } = useGetUserTopicStake(theGraphClient, id, connectedAddress)

  const { loading, topic, refetch: refetchTopic } = useGetTopic(theGraphClient, id)
  const { topics } = useGetTopics(theGraphClient, 0, 100)
  const topicOptions = topicsToOptions(topics || [])
  const { tags } = useGetTags (theGraphClient, 0, 100)
  const tagOptions = tagsToOptions(tags || [])

  console.log(`inside topic user stakes ${JSON.stringify(userStakes, null, 2)}`)
  const main = loading || !topic ?
    'loading' :
    <TopicDetail
      connectedAddress={connectedAddress}
      algernonInstance={algernonInstance}
      userStakes={userStakes}
      topic={topic}
      topicOptions={topicOptions}
      tagOptions={tagOptions}
      refetchTopic={refetchTopic}
    />
    
  return (
    <MainLayout
      header={<Header />}
      sidebar={<Sidebar selectedAddress={connectedAddress} canViewAdmin={canViewAdmin} />}
      main={ main }
    />
  )
}

export default Topic
