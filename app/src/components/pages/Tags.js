import React, { useContext } from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../materialDashboard/layouts/Topbar'
import Sidebar from '../materialDashboard/layouts/Sidebar'
import TagsMain from '../organisms/Tags/TagsMain'
import { useGetTags } from '../../queries/tag'
import { theGraphClient } from '../../utils/apolloClient'
import { WalletContext } from '../providers/WalletProvider'


export default () => {
  // @ts-ignore
  const { address, isAdmin } = useContext(WalletContext)
  const {loading, tags} = useGetTags(theGraphClient, 0, 100)
  const main = loading ? 'loading' : <TagsMain tags={tags} />
  return (
    <MainLayout
      header={<Header />}
      sidebar={<Sidebar selectedAddress={address} isAdmin={isAdmin} />}
      main={main}
    />
  )
}