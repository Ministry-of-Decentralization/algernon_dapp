import React, { useContext } from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../materialDashboard/layouts/Topbar'
import Sidebar from '../materialDashboard/layouts/Sidebar'
import TagsMain from '../organisms/Tags/TagsMain'
import { useGetTags } from '../../queries/tag'
import { theGraphClient } from '../../utils/apolloClient'
import { WalletContext } from '../providers/WalletProvider'


const Tags = () => {
  // @ts-ignore
  const { address, canViewAdmin } = useContext(WalletContext)
  const {loading, tags} = useGetTags(theGraphClient, 0, 100)
  const main = loading ? 'loading' : <TagsMain tags={tags} />
  return (
    <MainLayout
      header={<Header />}
      sidebar={<Sidebar selectedAddress={address} canViewAdmin={canViewAdmin} />}
      main={main}
    />
  )
}

export default Tags
