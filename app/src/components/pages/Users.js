import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../materialDashboard/layouts/Topbar'
import Sidebar from '../materialDashboard/layouts/Sidebar'
import UserList from '../organisms/Users/UserList'
import useGetAccount from '../hooks/useGetAccount'




export default () => {
  const { loading, users } = {};

  const connectedAddress = useGetAccount()

  const main = loading ? 'loading' : <UserList users={users} connectedAddress={connectedAddress} />
  return (
    <MainLayout
      header={<Header />}
      sidebar={<Sidebar selectedAddress={connectedAddress} />}
      main={main}
    />
  )
}