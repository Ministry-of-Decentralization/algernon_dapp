import React, { useContext } from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../materialDashboard/layouts/Topbar'
import Sidebar from '../materialDashboard/layouts/Sidebar'
import { useGetTag } from '../../queries/tag'
import { theGraphClient } from '../../utils/apolloClient'
import TagDetail from '../organisms/Tags/TagDetail'
import Box from '../atoms/Box'
import { WalletContext } from '../providers/WalletProvider'

// @ts-ignore
export default ({match: { params: id}}) => {
  // @ts-ignore
  const { address, isAdmin } = useContext(WalletContext)
  const {loading, tag} = useGetTag(theGraphClient, id.id)
  const main = loading ?
    'loading'
    :
    tag ?
      <TagDetail tag={tag} />
      :
      <Box>Invalid Tag</Box>
  return (
    <MainLayout
      header={<Header />}
      // @ts-ignore
      sidebar={<Sidebar selectedAddress={address} isAdmin={isAdmin} />}
      main={main}
    />
  )
}