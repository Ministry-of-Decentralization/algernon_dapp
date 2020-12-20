import React from 'react'
import { Form } from 'formik'
import { createTagSchema } from '../../../schemas/tag'
import Select from '../../atoms/inputs/Select'
import Web3Form from '../../formikTLDR/forms/Web3Form'
import Text from '../../atoms/inputs/Text'
import Button from '../../atoms/inputs/buttons/Button'

const getTagFromReceipt = (receipt) => receipt.events.TagAdded.returnValues.tag

const Success = (receipt) => (
  <div>
    <h3>Tag {getTagFromReceipt(receipt)} Created!</h3>
  </div>
)

const getForm = (tagOptions) => (submit, isValid) => (
  <Form>
    <div style={{padding: '2em 0'}}>
      <Text
        label="Tag"
        name="tag"
        type="string" 
      />
    </div>
    <div>
      <Select
        label="Parent"
        name="parent"
        options={tagOptions}
        multiple={false}
        style={{width: '60%', marginBottom: '1.5em'}}
      />
    </div>
    <Button
      label="Add Tag"
      onClick={submit}
      disabled={!isValid}
    />
  </Form>
)

const CreateTagForm = ({ connectedAddress, algernonInstance, tags }) => {
  const formProps = {
    defaultValues: createTagSchema.defaultValues,
    schema: createTagSchema.schema,
    getForm: getForm(tags),
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