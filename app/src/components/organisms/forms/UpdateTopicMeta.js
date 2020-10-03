import React, { useContext } from 'react'
import { Form } from 'formik'
import { createTopicSchema, updateTopicMetaSchema } from '../../../schemas/topic'
import Select from '../../atoms/inputs/Select'
// import RichText from '../../atoms/inputs/RichText'
import Text from '../../atoms/inputs/Text'
import TriggerButton from '../../atoms/inputs/buttons/Button'
import Modal from '../../atoms/Modal'
import Button from '../../atoms/inputs/buttons/Button'
import { formatAddFileVariables } from '../../formikTLDR/forms/utils'
import CallAndWeb3Form from '../../formikTLDR/forms/CallAndWeb3Form'
import { FileStoreContext } from '../../providers/FileStoreProvider'
import { getTopicSelectRenderValues } from '../../../utils/formatters'

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

const getForm = (tagOptions, topicOptions) => (submitForm, isValid, cancelForm) => (
  <Form style={{width: "50em"}}>
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
      <Select
        label="Requires Courses"
        name="requires"
        options={topicOptions}
        multiple={true}
        renderValue={getTopicSelectRenderValues(topicOptions)}
        style={{width: '60%', marginBottom: '1.5em'}}
      />
    </div>
    <div>
      <Select
        label="Supports Course"
        name="supports"
        options={topicOptions}
        multiple={true}
        renderValue={getTopicSelectRenderValues(topicOptions)}
        style={{width: '60%', marginBottom: '1.5em'}}
      />
    </div>
    <div>
      <TriggerButton
        onClick={cancelForm}
        label="Cancel"
      />
      <Button
        onClick={submitForm}
        disabled={!isValid}
        label='Update Course'
      />
    </div>
  </Form>
)

const getMethodArgs = (id) => (values) => (mutationResponse) => {
  return [id, values.tags, mutationResponse]
}

const UpdateTopicMetaForm = ({ connectedAddress, algernonInstance, tagOptions, topicOptions, topic, refetchTopic, onSuccess }) => {
  const { client: ipfs } = useContext(FileStoreContext)

  const formProps = {
    defaultValues: {
      ...topic,
      tags: topic.tags.map(t => t.id), requires: topic.requires.map(r => r.id), supports: topic.supports.map(t => t.id)
    },
    schema: updateTopicMetaSchema.schema,
    connectedAddress,
    getForm: getForm(tagOptions, topicOptions),
    call: ipfs.saveFile,
    getCallVariables: formatAddFileVariables(createTopicSchema.contentFields, {notes: topic.notes}),
    contractMethod: algernonInstance.methods.updateTopic,
    getMethodArgs: getMethodArgs(topic.id),
    stateEls: {
      successEl: Success,
      pendingOnChainEl: PendingOnChain,
      pendingOffChainEl: PendingOffChain,
      signatureRequiredEl: SignatureRequired,
      errorEl: FormError
    },
    formOnSuccess: false,
    onSuccess: () => {
      onSuccess && onSuccess()
      setTimeout(refetchTopic, 1000)
    }
  }
  return (
    <Modal 
      triggerText='Update Course'
      triggerColor="#3f51b5"
      title='Update Course Details'
      contentText=''
      getForm={(cancelForm) => (
        <CallAndWeb3Form
          formProps={{ ...formProps, cancelForm }}
        />
      )}
    />
  )
}

export default UpdateTopicMetaForm