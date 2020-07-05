import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../organisms/Header'
import Sidebar from '../organisms/Sidebar'
import TopicList from '../organisms/Topics/TopicList'
import useGetAccount from '../hooks/useGetAccount'
import { getTopics } from '../../queries/topic'
import { theGraphClient } from '../../utils/apolloClient'


export default () => {
  const selectedAddress = useGetAccount()
  const {loading, topics} = getTopics(theGraphClient, 0, 100)

  console.log(`topics page topics ${JSON.stringify(topics, null, 2)} -- ${loading}`)

  const main = loading ? loading : <TopicList topics={topics!} />
  return (
    <MainLayout
      header={<Header />}
      sidebar={<Sidebar selectedAddress={selectedAddress} />}
      main={main}
    />
  )
}