import React from 'react'
import { Form } from 'formik'
import { createStakeSchema } from '../../../schemas/stake'
import Select from '../../atoms/inputs/Select'
import Web3Form from '../../formikTLDR/forms/Web3Form'
import Text from '../../atoms/inputs/Text'
import Button from '../../atoms/inputs/buttons/Button'
import Modal from '../../atoms/Modal'
import Box from '../../atoms/Box'
import StakeIcon from '../../atoms/icons/Stake'
import { displayToNativeBalance } from '../../../utils/formatters'

const Success = () => (
  <div>
    <h3>Stake Successful!</h3>
  </div>
)

const getForm = (tag: string, topicTitle: string) => (submit: any, isValid: boolean) => (
  <Form>
    <div>Stake on</div>
    <div>{topicTitle}</div>
    <div>and {tag}</div>
    <div style={{padding: '2em 0'}}>
      <Text
        label="Stake Amount"
        name="amount"
        type="number" 
      />
    </div>
    <Button
      label="Submit Stake"
      onClick={submit}
      disabled={!isValid}
    />
  </Form>
)

const getMethodArgs = (topicId: string, tagId: string) => (values: any) => {
  return [topicId, tagId, displayToNativeBalance(values.amount)]
}

const CreateStakeForm = ({ connectedAddress, algernonInstance, topicId, tagId, tag, topicTitle }: any) => {
  const formProps = {
    defaultValues: createStakeSchema.defaultValues,
    schema: createStakeSchema.schema,
    getForm: getForm(tag, topicTitle),
    contractMethod: algernonInstance.methods.addStake,
    connectedAddress,
    getMethodArgs: getMethodArgs(topicId, tagId),
    stateEls: {
      successEl: Success
    },
    formOnSuccess: false
  }
  return (
    <Modal
      triggerText=''
      trigger={<StakeIcon />}
      title=''
      contentText=''
      getForm={(cancelForm: any) => {
        return (
          <Web3Form
            formProps={{...formProps, cancelForm}}
          />
        )
      }}
    />
  )
}

export default CreateStakeForm