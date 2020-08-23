import React from 'react'
import { Form } from 'formik'
import { profileSchema } from '../../../schemas/user'
import Text from '../../atoms/inputs/Text'
import Button from '../../atoms/inputs/buttons/MutationButton'
import { useUpdateUserProfile } from '../../../queries/user'
import MutationForm from '../../formikTLDR/forms/MutationForm'


const Success = () => (
  <div>
    <h3>Profile Updated</h3>
  </div>
)

const getForm = () => (mutationVariables, isValid, handleResponse) => (
  <Form>
    Update your profile
    <Text label="User Name" name="username" type="string" />
    <Text label="Organization" name="organization" type="string" />
    <Text
      label="Bio"
      name="description"
      type="string"
      multiline={true}
      rows={4}
      cols={30}
    />
    <Button
      mutation={useUpdateUserProfile}
      mutationVariables={{update:mutationVariables}}
      handleResponse={handleResponse}
      disabled={!isValid}
      label="Submit Update" />
  </Form>
)


const UpdateProfileForm = ({ connectedAddress, profile, onSuccess }) => (
  <MutationForm
    defaultValues={{...profileSchema.defaultValues, ...profile}}
    schema={profileSchema.schema}
    getForm={getForm()}
    staticMutationVariables={{stakeAddress: connectedAddress}}
    successEl={Success}
    formOnSuccess={false}
    onSuccess={() => onSuccess()}
  />
)

export default UpdateProfileForm