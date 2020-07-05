import React from 'react'
import Badge from '../../molecules/user/Badge'


export default (
  props
  ) => {
    const {
      stakeAddress, 
      username,
      organization,
      description,
      profileImage,
     } = props.profile
      return (
        <div>
          <Badge address={stakeAddress} username={username} />
          <h6>Organization</h6>
          <p>{organization}</p>
          <h6>Bio</h6>
          <p>{description}</p>
          <img src={profileImage} />
        </div>
      )
    }

  