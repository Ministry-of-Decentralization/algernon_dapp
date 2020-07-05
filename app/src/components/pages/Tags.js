import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../organisms/Header'
import Sidebar from '../organisms/Sidebar'
import TagsMain from '../organisms/Tags/TagsMain'
import useGetAccount from '../hooks/useGetAccount'
import { getTags } from '../../queries/tag'
import { theGraphClient } from '../../utils/apolloClient'


export default () => {
  const connectedAddress = useGetAccount()
  const {loading, tags} = getTags(theGraphClient, 0, 100)

  const main = loading ? 'loading' : <TagsMain connectedAddress={connectedAddress} tags={tags} />
  return (
    <MainLayout
      header={<Header />}
      sidebar={<Sidebar selectedAddress={connectedAddress} />}
      main={main}
    />
  )
}