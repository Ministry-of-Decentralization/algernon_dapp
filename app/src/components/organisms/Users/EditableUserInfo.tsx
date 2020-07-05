// @ts-nocheck
import React, { useState } from 'react'
import UpdateProfileForm from '../../organisms/forms/UpdateProfile'
import Button from '../../atoms/inputs/buttons/Button'
import Flex from '../../atoms/Flex'


type ProfileFormProps = {
  profile: any,
  refetchUser: any
}

type ProfileAndFormProps = {
  connectedAddress: string,
  formProps: ProfileFormProps,
  defaultContent: React.ReactNode
}

const MetaAndForm = ({connectedAddress, formProps, defaultContent}: ProfileAndFormProps) => {
  const {
    profile,
    refetchUser
  } = formProps
  const [swapped, setSwapped] = useState(false)
  const label = swapped ? 'Cancel' : 'Edit'

  const MetaForm = () => (
    <UpdateProfileForm
      connectedAddress={connectedAddress}
      profile={profile} 
      refetchUser={refetchUser}
      onSuccess={() => setSwapped(false)}
    />
  )

  const Form = () => (
    <Flex flexDirection="column">
      <Flex>
        <Button label={label} onClick={() => setSwapped(false)} />
      </Flex>
      <MetaForm />
      
    </Flex>
  )

  const Default: React.FC = () => (
    <Flex flexDirection="column">
      <Flex>
        <Button label={label} onClick={() => setSwapped(true)} />
      </Flex>
      {defaultContent}
    </Flex>
  )

  return swapped ?
    <Form /> :
    <Default />
}

export default MetaAndForm