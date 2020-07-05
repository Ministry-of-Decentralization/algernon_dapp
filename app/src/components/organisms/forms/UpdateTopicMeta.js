import React from 'react'
import { Form } from 'formik'
import { createTopicSchema, updateTopicMetaSchema } from '../../../schemas/topic'
import { algernonContract } from '../../../utils/web3'
import Select from '../../atoms/inputs/Select'
// import RichText from '../../atoms/inputs/RichText'
import Text from '../../atoms/inputs/Text'
import TriggerButton from '../../atoms/inputs/buttons/Button'
import Button from '../../atoms/inputs/buttons/MutationButton'
import { addFile } from '../../../queries/fileStorage'
import { formatAddFileVariables } from '../../formikTLDR/forms/common'
import MutationAndWeb3Form from '../../formikTLDR/forms/MutationAndWeb3Form'



const Success = ({title}) => (
  <div>
    <h3>Course Updated!</h3>
    <h4>{title}</h4>
  </div>
)

const FormError = ({error}) => (
  <div>
    <h3>Error updating topic!</h3>
  </div>
)

const PendingOffChain = () => (
  <div>
    <h3>Processing Course Update</h3>
  </div>
)

const SignatureRequired = () => (
  <div>
    <h3>Confirm Course Update With Your Web3 Wallet</h3>
  </div>
)

const PendingOnChain = () => (
  <div>
    <h3>Updating Course</h3>
  </div>
)

const getForm = (mutation, tagOptions, topicOptions) => (mutationVariables, isValid, handleResponse, cancelForm) => (
  <Form>
    <Text
      label="Title"
      name="title"
      type="string" 
    />
    <Text
      label="Url"
      name="url"
      type="url" 
    />
    <Text
      label="Description"
      name="description"
      type="string" 
    />
    <Select
      label="Tags"
      name="tags"
      options={tagOptions}
      multiple={true}
    />
    <div>
    <Select
      label="Requires Courses"
      name="requires"
      options={topicOptions}
      multiple={true}
    />
    </div>
    <Select
      label="Support Courses"
      name="supports"
      options={topicOptions}
      multiple={true}
    />
    <div>
      <TriggerButton
        onClick={cancelForm}
        label="Cancel"
      />
      <Button
        mutation={mutation}
        mutationVariables={mutationVariables}
        handleResponse={handleResponse}
        disabled={!isValid}
        label='Update Course'
      />
    </div>
  </Form>
)

const getMethodArgs = (id) => (values) => (mutationResponse) => {
  return [id, values.tags, mutationResponse]
}

const UpdateTopicMetaForm = ({ connectedAddress, tagOptions, topicOptions, topic, refetchTopic, onSuccess }) => (
  <MutationAndWeb3Form
    defaultValues={{...topic, tags: topic.tags.map(t => t.id), requires: topic.requires.map(r => r.id), supports: topic.supports.map(t => t.id)}}
    schema={updateTopicMetaSchema.schema}
    connectedAddress={connectedAddress}
    getForm={getForm(addFile, tagOptions, topicOptions)}
    getMutationVariables={formatAddFileVariables(createTopicSchema.contentFields, {notes: topic.notes})}
    contractMethod={algernonContract.methods.updateTopic}
    getMethodArgs={getMethodArgs(topic.id)}
    successEl={Success}
    pendingOnChainEl={PendingOnChain}
    pendingOffChainEl={PendingOffChain}
    signatureRequiredEl={SignatureRequired}
    errorEl={FormError}
    formOnSuccess={false}
    onSuccess={() => {
      onSuccess && onSuccess()
      setTimeout(refetchTopic, 1000)
    }}
  />
)

export default UpdateTopicMetaForm