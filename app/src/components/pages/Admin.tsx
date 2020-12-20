import React, { useContext } from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../materialDashboard/layouts/Topbar'
import Sidebar from '../materialDashboard/layouts/Sidebar'
import AdminMain from '../organisms/Admin/Main'
import { useGetTags } from '../../queries/tag'
import { theGraphClient } from '../../utils/apolloClient'
import { WalletContext } from '../providers/WalletProvider'
import { tagsToOptions } from '../atoms/inputs/optionsFormatters'


export default () => {
  // @ts-ignore
  const { algernonInstance, address, isAdmin } = useContext(WalletContext)
  const {loading, tags} = useGetTags(theGraphClient, 0, 100)
  console.log(`tags are ${tags && JSON.stringify(tags[0])}`)
  const tagOptions = tagsToOptions(tags || [], [{value: '0', label: 'No Parent'}])
  const main = loading && algernonInstance ? 'loading' : <AdminMain connectedAddress={address} algernonInstance={algernonInstance} tags={tagOptions} />
  return (
    <MainLayout
      header={<Header />}
      // @ts-ignore
      sidebar={<Sidebar selectedAddress={address} isAdmin={isAdmin} />}
      main={main}
    />
  )
}