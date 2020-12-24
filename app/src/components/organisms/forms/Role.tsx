import React from 'react'
import { Form } from 'formik'
import { grantRoleSchema } from '../../../schemas/admin'
import Web3Form from '../../formikTLDR/forms/Web3Form'
import Text from '../../atoms/inputs/Text'
import Button from '../../atoms/inputs/buttons/Button'

const Success = () => (
  <div>
    <h3>Role Granted!</h3>
  </div>
)

const getForm = (action: string, role: string) => (submit: any, isValid: boolean) => (
  <Form>
    <div style={{padding: '2em 0'}}>
      <Text
        label="Address"
        name="_addr"
        type="string" 
      />
    </div>
    <Button
      label={`${action} ${role} Role`}
      onClick={submit}
      disabled={!isValid}
    />
  </Form>
)

const RoleForm = ({ connectedAddress, action, role, contractMethod }: any) => {
  const formProps = {
    defaultValues: grantRoleSchema.defaultValues,
    schema: grantRoleSchema.schema,
    getForm: getForm(action, role),
    contractMethod,
    connectedAddress,
    methodArgs: ['_addr'],
    stateEls: {
      successEl: Success
    },
    formOnSuccess: true
  }
  return (
    <Web3Form
      // @ts-ignore
      formProps={formProps}
    />
  )
}

export default RoleForm