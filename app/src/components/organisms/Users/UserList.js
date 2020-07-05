import React from 'react'
import { Link } from 'react-router-dom'
import SignUpForm from '../forms/SignUp'
import { getUser } from '../../../queries/user'

const User = ({stakeAddress, username, description}) =>
    <div>
        <h4>{username}</h4>
        <h4><Link to={`profile/${stakeAddress}`}>{stakeAddress}</Link></h4>
        <p>{description}</p>
    </div>

const UserList = ({users, connectedAddress}) => {
  const user = connectedAddress ? getUser(connectedAddress) : 'NOT_CONNECTED'

  let signUpContent = null
  if (user === 'NOT_CONNECTED') {
    signUpContent = 'become an algeronian and connect a wallet'
  } else if (user.user) {
    signUpContent = 'you are an algeronian'
  } else {
    signUpContent = <SignUpForm connectedAddress={connectedAddress} />
  }

  return (
    <div>
      <h2>Users</h2>
      {signUpContent}
      <div>
        {users.map(user => <User key={user.username} {...user} />)}
      </div>
    </div>
  )
}

export default UserList