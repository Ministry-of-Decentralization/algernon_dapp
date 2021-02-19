import React, { useContext } from 'react'
import { Form } from 'formik'
import { createTopicSchema, updateTopicNotesSchema } from '../../../schemas/topic'
import RichText from '../../atoms/inputs/RichText'
import Button from '../../atoms/inputs/buttons/Button'
import { formatAddFileVariables } from '../../formikTLDR/forms/utils'
import CallAndWeb3Form from '../../formikTLDR/forms/CallAndWeb3Form'
import { FileStoreContext } from '../../providers/FileStoreProvider'
import LoadingCard from '../../molecules/common/LoadingCard'


const Success = ({title}) => (
  <div>
    <h3>Course Updated!</h3>
    <h4>{title}</h4>
  </div>
)

const FormError = ({error}) => (
  <div>
    <h3>Error updating Course!</h3>
  </div>
)

const PendingOffChain = () => <LoadingCard message='Processing Course Update' />

const SignatureRequired = () => (
  <div>
    <h5>Confirm Course Update With Your Web3 Wallet</h5>
  </div>
)

const PendingOnChain = () => <LoadingCard message='Saving Updates' />

const getForm = () => (submitForm, isValid, cancelForm) => (
  <Form>
    <RichText
      label="Notes"
      name="notes"
    />
    <div>
      <Button
        onClick={submitForm}
        disabled={!isValid}
        label='Edit Course'
      />Edit
    </div>
  </Form>
)

const getMethodArgs = (id) => (values) => (mutationResponse) => {
  return [id, values.tags, mutationResponse]
}

const UpdateTopicNotesForm = ({ connectedAddress, algernonInstance, topic, refetchTopic, onSuccess }) => {
  const { client: ipfs } = useContext(FileStoreContext)

  return (
    <CallAndWeb3Form
      formProps={{
        defaultValues:{
          ...topic,
          tags: topic.tags.map(t => t.id), requires: topic.requires.map(r => r.id), supports: topic.supports.map(t => t.id)
        },
        schema: updateTopicNotesSchema.schema,
        connectedAddress,
        getForm: getForm(),
        call: ipfs.saveFile,
        getCallVariables: formatAddFileVariables(createTopicSchema.contentFields, topic),
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
      }}
    />
  )
}

export default UpdateTopicNotesForm