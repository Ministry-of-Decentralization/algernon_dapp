import React, { useContext } from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../materialDashboard/layouts/Topbar'
import Sidebar from '../materialDashboard/layouts/Sidebar'
import ProfileMain from '../organisms/Profile/ProfileMain'
import { useGetUser } from '../../queries/user';
import { useGetTopicsForOwner } from '../../queries/topic'
import { useGetTags } from '../../queries/tag'
import { theGraphClient } from '../../utils/apolloClient'
import { tagsToOptions } from '../atoms/inputs/optionsFormatters'

import { WalletContext } from '../providers/WalletProvider'


export default (props) => {
  const address = props.match.params.address
  const { topics, refetch: refetchTopics } = useGetTopicsForOwner(theGraphClient, 0, 100, address)
  const { tags } = useGetTags(theGraphClient, 0, 100)
  const tagOptions = tagsToOptions(tags || [])

  const { user, loading : userLoading, refetch: refetchUser } = useGetUser(address);
  // @ts-ignore
  const { algernonInstance, address: connectedAddress, provider } = useContext(WalletContext)

  console.log(`in profile address ${address} -- connected address ${connectedAddress} -- ${algernonInstance}`)
  const main = (
    <div>
      <ProfileMain
        user={user}
        userLoading={userLoading}
        address={address}
        connectedAddress={connectedAddress}
        algernonInstance={algernonInstance}
        tagOptions={tagOptions}
        topics={topics || []}
        refetchTopics={refetchTopics}
        refetchUser={refetchUser}
      />
    </div>
  )
  return (
  <MainLayout
    header={<Header />}
    sidebar={<Sidebar selectedAddress={connectedAddress} />}
    main={main}
  />
  )
}