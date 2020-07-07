import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../organisms/Header'
import Sidebar from '../organisms/Sidebar'
import useGetAccount from '../hooks/useGetAccount'
import { getTag } from '../../queries/tag'
import { theGraphClient } from '../../utils/apolloClient'
import TagDetail from '../organisms/Tags/TagDetail'
import Box from '../atoms/Box'

// @ts-ignore
export default ({match: { params: id}}) => {
  const selectedAddress = useGetAccount()
  const {loading, tag} = getTag(theGraphClient, id.id)
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
      sidebar={<Sidebar selectedAddress={selectedAddress} />}
      main={main}
    />
  )
}