import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../materialDashboard/layouts/Topbar'
import Sidebar from '../materialDashboard/layouts/Sidebar'
import useGetAccount from '../hooks/useGetAccount'
import TopicDetail from '../molecules/topics/Detail'
import { getTopic, getTopics } from '../../queries/topic'
import { theGraphClient } from '../../utils/apolloClient'
import { tagsToOptions, topicsToOptions } from '../atoms/inputs/optionsFormatters'
import { getTags } from '../../queries/tag'

export default ({match: { params: id}}) => {
  id = id.id

  const connectedAddress = useGetAccount()
  const { loading, topic, refetch: refetchTopic } = getTopic(theGraphClient, id)
  const { topics } = getTopics(theGraphClient, 0, 100)
  const topicOptions = topicsToOptions(topics || [])
  const { tags } = getTags (theGraphClient, 0, 100)
  const tagOptions = tagsToOptions(tags || [])

  const main = loading || !topic ?
    'loading' :
    <TopicDetail
      connectedAddress={connectedAddress}
      topic={topic}
      topicOptions={topicOptions}
      tagOptions={tagOptions}
      refetchTopic={refetchTopic}
    />
    
  return (
    <MainLayout
      header={<Header />}
      sidebar={<Sidebar selectedAddress={connectedAddress} />}
      main={ main }
    />
  )
}