import React from 'react'
import { Form } from 'formik'
import { Link } from 'react-router-dom'
import { signUpSchema } from '../../../schemas/user'
import Text from '../../atoms/inputs/Text'
import Button from '../../atoms/inputs/buttons/MutationButton'
import { useCreateUser } from '../../../queries/user'
import MutationForm from '../../formikTLDR/forms/MutationForm'


const Success = (response) => (
  <div>
    <h3>Congratulations {response.username} you are an Algeronian!</h3>
    <Link to={`profile/${response.stakeAddress}`}><div>Visit your profile page to get started</div></Link>
  </div>
)

const getForm = (connectedAddres) => (mutationVariables, isValid, handleResponse) => (
  <Form>
    Register Address { connectedAddres }
    <Text label="User Name" name="username" type="string" />
    <Text label="Password" name="password" type="password" />
    <Button
      mutation={useCreateUser}
      mutationVariables={{input:mutationVariables}}
      handleResponse={handleResponse}
      disabled={!isValid}
      label="Sign Up" />
  </Form>
)


const SignUpForm = ({ connectedAddress }) => (
  <MutationForm
    defaultValues={signUpSchema.defaultValues}
    schema={signUpSchema.schema}
    getForm={getForm(connectedAddress)}
    staticMutationVariables={{stakeAddress: connectedAddress}}
    successEl={Success}
    formOnSuccess={false}
  />
)

export default SignUpForm