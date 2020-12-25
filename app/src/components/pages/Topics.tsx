import React, { useContext } from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../materialDashboard/layouts/Topbar'
import Sidebar from '../materialDashboard/layouts/Sidebar'
import TopicList from '../organisms/Topics/TopicList'
import { useGetTopics } from '../../queries/topic'
import { theGraphClient } from '../../utils/apolloClient'
import { WalletContext } from '../providers/WalletProvider'


export default () => {
  // @ts-ignore
  const { address, canViewAdmin } = useContext(WalletContext)
  const {loading, topics} = useGetTopics(theGraphClient, 0, 100)
  const topicList = (
    <div>
      <h2>Explore Courses</h2>
      <TopicList topics={topics!} />
    </div>
  )
  const main = loading ? loading : topicList
  return (
    <MainLayout
      header={<Header />}
      // @ts-ignore
      sidebar={<Sidebar selectedAddress={address} canViewAdmin={canViewAdmin} />}
      main={main}
    />
  )
}