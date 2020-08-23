import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../materialDashboard/layouts/Topbar'
import Sidebar from '../materialDashboard/layouts/Sidebar'
import useGetAccount from '../hooks/useGetAccount'
import { useGetTag } from '../../queries/tag'
import { theGraphClient } from '../../utils/apolloClient'
import TagDetail from '../organisms/Tags/TagDetail'
import Box from '../atoms/Box'

// @ts-ignore
export default ({match: { params: id}}) => {
  const selectedAddress = useGetAccount()
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
      sidebar={<Sidebar selectedAddress={selectedAddress} />}
      main={main}
    />
  )
}