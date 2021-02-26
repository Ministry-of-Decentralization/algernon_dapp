import React, { useContext } from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../materialDashboard/layouts/Topbar'
import Sidebar from '../materialDashboard/layouts/Sidebar'
import CollegeCards from '../organisms/Colleges/CollegeCards'
import { WalletContext } from '../providers/WalletProvider'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import PeopleIcon from '@material-ui/icons/People'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'

const colleges = [
  {
    id: 3,
    title: 'Solidity',
    description: 'Learn about Solidity and smart contracts.',
    icon: <AccountBalanceWalletIcon />
  },
  {
    id: 2,
    title: 'Ethereum',
    description: 'Smart contracts on the Ethereum network',
    icon: <AccountTreeIcon />
  },
  {
    id: 20,
    title: 'Decentralized Applications',
    description: 'Designing and developing dapps.',
    icon: <PeopleIcon />
  },
]

const Overview = () => {
  const { address, canViewAdmin } = useContext(WalletContext)

  return (
    <MainLayout
      header={<Header />}
      sidebar={<Sidebar selectedAddress={address} canViewAdmin={canViewAdmin} />}
      main={<CollegeCards colleges={colleges}  />}
    />
  )
}

export default Overview