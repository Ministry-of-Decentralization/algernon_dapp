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
  const { algernonInstance, address } = useContext(WalletContext)
  const {loading, tags} = useGetTags(theGraphClient, 0, 100)

  const main = loading ? 'loading' : <TagsMain connectedAddress={address} algernonInstance={algernonInstance} tags={tags} />
  return (
    <MainLayout
      header={<Header />}
      sidebar={<Sidebar selectedAddress={address} />}
      main={main}
    />
  )
}