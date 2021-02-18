import React, { useContext } from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../materialDashboard/layouts/Topbar'
import Sidebar from '../materialDashboard/layouts/Sidebar'
import TopicDetail from '../molecules/topics/Detail'
import { useGetTopic, useGetTopics } from '../../queries/topic'
import { theGraphClient } from '../../utils/apolloClient'
import { tagsToOptions, topicsToOptions } from '../atoms/inputs/optionsFormatters'
import { useGetTags } from '../../queries/tag'
import { WalletContext } from '../providers/WalletProvider'

const Topic = ({match: { params: id}}) => {
  id = id.id

  const { algernonInstance, canViewAdmin, address: connectedAddress } = useContext(WalletContext)

  const { loading, topic, refetch: refetchTopic } = useGetTopic(theGraphClient, id)
  const { topics } = useGetTopics(theGraphClient, 0, 100)
  const topicOptions = topicsToOptions(topics || [])
  const { tags } = useGetTags (theGraphClient, 0, 100)
  const tagOptions = tagsToOptions(tags || [])

  const main = loading || !topic ?
    'loading' :
    <TopicDetail
      connectedAddress={connectedAddress}
      algernonInstance={algernonInstance}
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
