import React, { useContext } from 'react'
import MainLayout from '../layouts/MainLayout'
import Header from '../materialDashboard/layouts/Topbar'
import Sidebar from '../materialDashboard/layouts/Sidebar'
import CollegeCards from '../organisms/Colleges/CollegeCards'
import { WalletContext } from '../providers/WalletProvider'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import PeopleIcon from '@material-ui/icons/People'
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'

const colleges = [
  {
    id: 1,
    title: 'Blockchain School',
    description: 'Bitcoin, Ethereum, and other crypto projects',
    icon: <AccountTreeIcon />
  },
  {
    id: 2,
    title: 'Solidity',
    description: 'Learn about Solidity and writing smart contracts.',
    icon: <AccountBalanceWalletIcon />
  },
  {
    id: 3,
    title: 'Cryptography',
    description: 'Crypto basics and wallets',
    icon: <EnhancedEncryptionIcon />
  },
  {
    id: 4,
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