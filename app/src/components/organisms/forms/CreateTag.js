import React from 'react'
import { Form } from 'formik'
import { createTagSchema } from '../../../schemas/tag'

import Web3Form from '../../formikTLDR/forms/Web3Form'
import Text from '../../atoms/inputs/Text'
import Button from '../../atoms/inputs/buttons/Button'

const getTagFromReceipt = (receipt) => receipt.events.TagAdded.returnValues.tag

const Success = (receipt) => (
  <div>
    <h3>Tag {getTagFromReceipt(receipt)} Created!</h3>
  </div>
)

const getForm = (submit, isValid) => (
  <Form>
    <Text
      label="Tag"
      name="tag"
      type="string" 
    />
    <Button
      label="Add Tag"
      onClick={submit}
      disabled={!isValid}// ? null : 'disabled'}
    />
  </Form>
)

const CreateTagForm = ({ connectedAddress, algernonInstance }) => {
  const formProps = {
    defaultValues: createTagSchema.defaultValues,
    schema: createTagSchema.schema,
    getForm: getForm,
    contractMethod: algernonInstance.methods.addTag,
    connectedAddress,
    methodArgs: ['tag', 'parent'],
    stateEls: {
      successEl: Success
    },
    formOnSuccess: true
  }
  return (
    <Web3Form
      formProps={formProps}
    />
  )
}

export default CreateTagForm