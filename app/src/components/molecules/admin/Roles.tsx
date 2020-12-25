import React from 'react'
import RoleForm from '../../organisms/forms/Role'

interface RolesProps {
  isAdmin: boolean
  address: string
  algernonInstance: any
}

const Roles = ({ algernonInstance, address, isAdmin }: RolesProps) => {
  return (
    <div>
      <h3 style={{marginBottom: '1em'}}>Roles</h3>
      { isAdmin ?
        <div>
          <RoleForm
            connectedAddress={address}
            role="Admin"
            action="Grant"
            contractMethod={algernonInstance.methods.grantAdminRole}
          />
          <RoleForm
            connectedAddress={address}
            role="Tagger"
            action="Grant"
            contractMethod={algernonInstance.methods.grantTaggerRole}
          />
          <RoleForm
            connectedAddress={address}
            role="Admin"
            action="Revoke"
            contractMethod={algernonInstance.methods.revokeAdminRole}
          />
          <RoleForm
            connectedAddress={address}
            role="Tagger"
            action="Revoke"
            contractMethod={algernonInstance.methods.revokeTaggerRole}
          />
        </div> : 'Must be granted Admin role to update roles'
      }
    </div>
  )
}

export default Roles