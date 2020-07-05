import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../organisms/Header'
import Sidebar from '../organisms/Sidebar'
import TopicsList from '../organisms/Topics/TopicList'
import useGetAccount from '../hooks/useGetAccount'
import { getTopics } from '../../queries/topic'
import { theGraphClient } from '../../utils/apolloClient'

export default () => {
  const selectedAddress = useGetAccount()
  const {loading, topics} = getTopics(theGraphClient, 0, 100)

  return (
    <MainLayout
      header={<Header />}
      sidebar={<Sidebar selectedAddress={selectedAddress} />}
      main={loading ? 'loading' : <TopicsList topics={topics}  />}
    />
  )
}