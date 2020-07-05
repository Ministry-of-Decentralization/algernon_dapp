import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../organisms/Header'
import Sidebar from '../organisms/Sidebar'
import ProfileMain from '../organisms/Profile/ProfileMain'
import useGetAccount from '../hooks/useGetAccount'
import { getUser } from '../../queries/user';
import { getTopicsForOwner } from '../../queries/topic'
import { getTags } from '../../queries/tag'
import { theGraphClient } from '../../utils/apolloClient'
import { tagsToOptions } from '../atoms/inputs/optionsFormatters'
import Box from '../atoms/Box'


export default (props) => {
  const address = props.match.params.address
  const { topics, refetch: refetchTopics } = getTopicsForOwner(theGraphClient, 0, 100, address)
  const { tags } = getTags(theGraphClient, 0, 100)
  const tagOptions = tagsToOptions(tags || [])

  const { user, loading : userLoading, refetch: refetchUser } = getUser(address);
  const connectedAddress = useGetAccount()


  const main = !userLoading && user ? 
    <ProfileMain
      user={user}
      userLoading={userLoading}
      address={address}
      connectedAddress={connectedAddress}
      tagOptions={tagOptions}
      topics={topics}
      refetchTopics={refetchTopics}
      refetchUser={refetchUser} />
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