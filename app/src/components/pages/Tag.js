import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../organisms/Header'
import Sidebar from '../organisms/Sidebar'
import useGetAccount from '../hooks/useGetAccount'
import { getTag } from '../../queries/tag'
import { theGraphClient } from '../../utils/apolloClient'
import TagDetail from '../organisms/Tags/TagDetail'


export default ({match: { params: id}}) => {
  const selectedAddress = useGetAccount()
  const {loading, tag} = getTag(theGraphClient, id.id)
  console.log('loading and tags ', loading, tag, id)


  const main = loading ? 'loading' : <TagDetail tag={tag} />
  return (
    <MainLayout
      header={<Header />}
      sidebar={<Sidebar selectedAddress={selectedAddress} />}
      main={main}
    />
  )
}