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
  const { address } = useContext(WalletContext)
  const {loading, topics} = useGetTopics(theGraphClient, 0, 100)

  const main = loading ? loading : <TopicList topics={topics!} />
  return (
    <MainLayout
      header={<Header />}
      // @ts-ignore
      sidebar={<Sidebar selectedAddress={address} />}
      main={main}
    />
  )
}