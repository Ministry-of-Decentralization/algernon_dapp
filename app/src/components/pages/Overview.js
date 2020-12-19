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
    title: 'Blockchain School',
    description: 'Bitcoin, Ethereum, and other crypto projects',
    icon: <AccountTreeIcon />
  },
  {
    title: 'Smart Contracts',
    description: 'Learn about smart contracts and how to create them.',
    icon: <AccountBalanceWalletIcon />
  },
  {
    title: 'Cryptography',
    description: 'Cryptographic keys, encryption schemas, and the math the makes it all work.',
    icon: <EnhancedEncryptionIcon />
  },
  {
    title: 'Decentralized Applications',
    description: 'Designing and developing dapps.',
    icon: <PeopleIcon />
  },
]

export default () => {
  // @ts-ignore
  const { address, isAdmin } = useContext(WalletContext)

  return (
    <MainLayout
      header={<Header />}
      sidebar={<Sidebar selectedAddress={address} isAdmin={isAdmin} />}
      main={<CollegeCards colleges={colleges}  />}
    />
  )
}