import React, { useContext } from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../materialDashboard/layouts/Topbar'
import Sidebar from '../materialDashboard/layouts/Sidebar'
import AdminMain from '../organisms/Admin/Main'
import { useGetTags } from '../../queries/tag'
import { theGraphClient } from '../../utils/apolloClient'
import { WalletContext } from '../providers/WalletProvider'


export default () => {
  // @ts-ignore
  const { algernonInstance, address, isAdmin } = useContext(WalletContext)
  const {loading, tags} = useGetTags(theGraphClient, 0, 100)

  const main = loading ? 'loading' : <AdminMain connectedAddress={address} algernonInstance={algernonInstance} tags={tags} />
  return (
    <MainLayout
      header={<Header />}
      // @ts-ignore
      sidebar={<Sidebar selectedAddress={address} isAdmin={isAdmin} />}
      main={main}
    />
  )
}