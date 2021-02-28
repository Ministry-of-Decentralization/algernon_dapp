import React, { useContext } from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../materialDashboard/layouts/Topbar'
import Sidebar from '../materialDashboard/layouts/Sidebar'
import ProfileMain from '../organisms/Profile/ProfileMain'
import { useGetTopicsForOwner } from '../../queries/topic'
import { useGetTags } from '../../queries/tag'
import { theGraphClient } from '../../utils/apolloClient'
import { tagsToOptions } from '../atoms/inputs/optionsFormatters'
import { WalletContext } from '../providers/WalletProvider'
import { convertToChecksum } from '../../utils/web3'
import { useGetOwnerByAddress } from '../../queries/user'


const Profile = (props) => {
  const address = convertToChecksum(props.match.params.address)
  const { topics, refetch: refetchTopics } = useGetTopicsForOwner(theGraphClient, 0, 100, address)
  const { user, loading : userLoading, refetch: refetchUser } = useGetOwnerByAddress(theGraphClient, address)
  const { tags } = useGetTags(theGraphClient, 0, 100)
  const tagOptions = tagsToOptions(tags || [])


  // @ts-ignore
  const { algernonInstance, algerTokenInstance, address: connectedAddress, canViewAdmin } = useContext(WalletContext)

  const main = (
    <div>
      <ProfileMain
        user={user}
        userLoading={userLoading}
        address={address}
        connectedAddress={connectedAddress}
        algernonInstance={algernonInstance}
        algerTokenInstance={algerTokenInstance}
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
    sidebar={<Sidebar selectedAddress={connectedAddress} canViewAdmin={canViewAdmin} />}
    main={main}
  />
  )
}

export default Profile