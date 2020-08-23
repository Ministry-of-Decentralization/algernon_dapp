import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../materialDashboard/layouts/Topbar'
import Sidebar from '../materialDashboard/layouts/Sidebar'
import ProfileMain from '../organisms/Profile/ProfileMain'
import useGetAccount from '../hooks/useGetAccount'
import { useGetUser } from '../../queries/user';
import { useGetTopicsForOwner } from '../../queries/topic'
import { useGetTags } from '../../queries/tag'
import { theGraphClient } from '../../utils/apolloClient'
import { tagsToOptions } from '../atoms/inputs/optionsFormatters'
import Box from '../atoms/Box'
import Box3 from '../organisms/Users/3Box' 


export default (props) => {
  const address = props.match.params.address
  const { topics, refetch: refetchTopics } = useGetTopicsForOwner(theGraphClient, 0, 100, address)
  const { tags } = useGetTags(theGraphClient, 0, 100)
  const tagOptions = tagsToOptions(tags || [])

  const { user, loading : userLoading, refetch: refetchUser } = useGetUser(address);
  const connectedAddress = useGetAccount()


  const main = !userLoading && user ?
  <div>
    <ProfileMain
      user={user}
      userLoading={userLoading}
      address={address}
      connectedAddress={connectedAddress}
      tagOptions={tagOptions}
      topics={topics}
      refetchTopics={refetchTopics}
      refetchUser={refetchUser} />
      <Box3 address={address} />
  </div>
      :
      <Box>No registered user for this address</Box>
  return (
  <MainLayout
    header={<Header />}
    sidebar={<Sidebar selectedAddress={connectedAddress} />}
    main={main}
  />
  )
}