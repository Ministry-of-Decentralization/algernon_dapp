import React  from 'react'
import UserInfo from '../Users/UserInfo'
import EditableUserInfo from '../Users/EditableUserInfo'

export default (
  props
  ) => {
  const {
    connectedAddress,
    user,
    refetchUser
   } = props

   const userInfo = <UserInfo profile={user} />

   const profile = {
     username: user.username,
     organization: user.organization,
     description: user.description,
     profileImage: user.profileImage
   }
   const formProps = {
     profile,
     refetchUser
   }
    return (
    <div>
      {user ?
        connectedAddress === user.stakeAddress ?
          <EditableUserInfo connectedAddress={connectedAddress} formProps={formProps} defaultContent={userInfo} />
          :
          userInfo
        :
        'No regsisted user for this address'
      }
    </div>
    )
  }