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
import LoadingCard from '../../molecules/common/LoadingCard'

const Success = () => (
  <div>
    <h3>Course Updated!</h3>
  </div>
)

const FormError = ({error}) => (
  <div>
    <h3>Error updating topic!</h3>
  </div>
)

const PendingOffChain = () => (
  <LoadingCard message='Processing Course Update' />
)

const SignatureRequired = () => (
  <div>
    <h5>Confirm Course Update With Your Web3 Wallet</h5>
  </div>
)

const PendingOnChain = () => (
  <LoadingCard message='Updating Course' />
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
        style={{marginLeft: '1em'}}
        onClick={submitForm}
        disabled={!isValid}
        label='Edit MetaData'
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
      triggerText='Edit Course'
      triggerColor="#FFF"
      title='Editing Course Details'
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