import React, { useContext } from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../materialDashboard/layouts/Topbar'
import Sidebar from '../materialDashboard/layouts/Sidebar'
import AdminMain from '../organisms/Admin/Main'
import { useGetTags } from '../../queries/tag'
import { theGraphClient } from '../../utils/apolloClient'
import { WalletContext } from '../providers/WalletProvider'
import { tagsToOptions } from '../atoms/inputs/optionsFormatters'


const AdminPage = () => {
  // @ts-ignore
  const { algernonInstance, address, isAdmin, isTagger, canViewAdmin } = useContext(WalletContext)
  const {loading, tags} = useGetTags(theGraphClient, 0, 100)
  console.log(`in admin ${algernonInstance}`)
  const tagOptions = tagsToOptions(tags || [], [{value: '0', label: 'No Parent'}])
  const main = loading || algernonInstance == null ? 'loading' : <AdminMain connectedAddress={address} algernonInstance={algernonInstance} tags={tagOptions} isAdmin={isAdmin} isTagger={isTagger} />
  return (
    <MainLayout
      header={<Header />}
      // @ts-ignore
      sidebar={<Sidebar selectedAddress={address} canViewAdmin={canViewAdmin} />}
      main={main}
    />
  )
}

export default AdminPage