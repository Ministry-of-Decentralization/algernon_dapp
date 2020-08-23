import React from 'react'
import { Link } from 'react-router-dom'
import SignUpForm from '../forms/SignUp'
import { useGetUser } from '../../../queries/user'

const User = ({stakeAddress, username, description}:{stakeAddress: string, username: string, description: string}) =>
    <div>
        <h4>{username}</h4>
        <h4><Link to={`profile/${stakeAddress}`}>{stakeAddress}</Link></h4>
        <p>{description}</p>
    </div>

const UserConnection = ({connectedAddress}:{connectedAddress: string}) => {
  const user = useGetUser(connectedAddress)
  let signUpContent = null
  if (user.user) {
    signUpContent = <div>you are an algeronian</div>
  } else {
    signUpContent = <SignUpForm connectedAddress={connectedAddress} />
  }

  return signUpContent

}

const UserList = ({users, connectedAddress}: {users: any, connectedAddress: string}) => {
  const connectedWallet = connectedAddress ?
    <UserConnection connectedAddress={connectedAddress} /> : <div>Connect A Wallet</div>

  return (
    <div>
      <h2>Users</h2>
      {connectedWallet}
      <div>
        {users.map((user: any) => <User key={user.username} {...user} />)}
      </div>
    </div>
  )
}

export default UserList