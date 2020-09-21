import React, { useContext } from 'react'
import { Form } from 'formik'
import { createTopicSchema } from '../../../schemas/topic'
import Select from '../../atoms/inputs/Select'
import Text from '../../atoms/inputs/Text'
import RichText from '../../atoms/inputs/RichText'
import TriggerButton from '../../atoms/inputs/buttons/Button'
import Button from '../../atoms/inputs/buttons/Button'

import { formatAddFileVariables } from '../../formikTLDR/forms/utils'
import CallAndWeb3Form from '../../formikTLDR/forms/CallAndWeb3Form'
import { FileStoreContext } from '../../providers/FileStoreProvider'


const Success = ({title}) => (
  <div>
    <h3>Course Created!</h3>
    <h4>{title}</h4>
  </div>
)

const FormError = ({error}) => (
  <div>
    <h3>Error creating topic!</h3>
  </div>
)

const PendingOffChain = () => (
  <div>
    <h3>Processing Course Creation</h3>
  </div>
)

const SignatureRequired = () => (
  <div>
    <h3>Confirm Course Creation in your web3 wallet</h3>
  </div>
)

const PendingOnChain = () => (
  <div>
    <h3>Saving New Course</h3>
  </div>
)

const getForm = (tagOptions, topicOptions) => (submitForm, isValid, cancelForm) => (
  <Form>
    <Text
      label="Title"
      name="title"
      type="string"
      fullWidth={true} 
    />
    <Text
      label="Url"
      name="url"
      type="url"
      fullWidth={true} 
    />
    <Text
      label="Description"
      name="description"
      type="string"
      fullWidth={true} 
    />
    <RichText
      label="Notes"
      name="notes"
    />
    <div>
      <Select
        label="Requires Courses"
        name="requires"
        options={topicOptions}
        multiple={true}
        style={{width: '60%', marginBottom: '1.5em'}}
      />
    </div>
    <div>
      <Select
        label="Supports Course"
        name="supports"
        options={topicOptions}
        multiple={true}
        style={{width: '60%', marginBottom: '1.5em'}}
      />
    </div>
    <div>
      <Select
        label="Tags"
        name="tags"
        options={tagOptions}
        multiple={true}
        style={{width: '60%', marginBottom: '1.5em'}}
      />
    </div>
    <div>
      <TriggerButton
        onClick={cancelForm}
        label="Cancel"
        color="secondary"
      />
      <Button
        onClick={submitForm}
        disabled={!isValid}
        label='Create Course'
      />
    </div>
    
  </Form>
)

const getMethodArgs = (values) => (mutationResponse) => {
  console.log(`inside getMethos args respnse os ${mutationResponse}`)
  return [values.tags, mutationResponse]
}

const CreateTopicForm = ({ connectedAddress, algernonInstance, tagOptions, topicOptions, refetchTopics }) => {
  const { client: ipfs } = useContext(FileStoreContext)
  const formProps = {
    connectedAddress,
    defaultValues: createTopicSchema.defaultValues,
    schema:createTopicSchema.schema,
    getForm: getForm(tagOptions, topicOptions),
    call: ipfs.saveFile,
    getCallVariables: formatAddFileVariables(createTopicSchema.contentFields),
    contractMethod: algernonInstance.methods.createTopic,
    getMethodArgs: getMethodArgs,
    stateEls: {
      successEl: Success,
      pendingOnChainEl: PendingOnChain,
      pendingOffChainEl: PendingOffChain,
      signatureRequiredEl: SignatureRequired,
      errorEl: FormError
    },
    onSuccess: () => setTimeout(refetchTopics, 1000),
    formOnSuccess: true,
    triggerEl: <TriggerButton
      label="Create Course"
      color="primary"
    />
  }
  return (
    <CallAndWeb3Form
    formProps={formProps}
    />
  )
}

export default CreateTopicForm