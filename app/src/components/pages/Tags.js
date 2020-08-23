import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../materialDashboard/layouts/Topbar'
import Sidebar from '../materialDashboard/layouts/Sidebar'
import TagsMain from '../organisms/Tags/TagsMain'
import useGetAccount from '../hooks/useGetAccount'
import { useGetTags } from '../../queries/tag'
import { theGraphClient } from '../../utils/apolloClient'


export default () => {
  const connectedAddress = useGetAccount()
  const {loading, tags} = useGetTags(theGraphClient, 0, 100)

  const main = loading ? 'loading' : <TagsMain connectedAddress={connectedAddress} tags={tags} />
  return (
    <MainLayout
      header={<Header />}
      sidebar={<Sidebar selectedAddress={connectedAddress} />}
      main={main}
    />
  )
}