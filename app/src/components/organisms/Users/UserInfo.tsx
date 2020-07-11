import React from 'react'
import Badge from '../../molecules/user/Badge'
import { User as UserType } from 'algernonTypes'

interface Props {
  profile: UserType
}
export default (
  { profile }: Props
  ) => {
    const {
      stakeAddress, 
      username,
      organization,
      description,
      profileImage,
     } = profile
      return (
        <div>
          <Badge address={stakeAddress} username={username} />
          <h6>Organization</h6>
          <p>{organization}</p>
          <h6>Bio</h6>
          <p>{description}</p>
          {profileImage ? <img alt="profile" src={profileImage} /> : null}
        </div>
      )
    }