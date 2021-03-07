import React from 'react'
import { Form } from 'formik'
import { updateStakeSchema } from '../../../schemas/stake'
import Web3Form from '../../formikTLDR/forms/Web3Form'
import Text from '../../atoms/inputs/Text'
import Button from '../../atoms/inputs/buttons/Button'
import Modal from '../../atoms/Modal'
import StakeIcon from '../../atoms/icons/Stake'
import { displayToNativeBalance } from '../../../utils/formatters'
import Radio from '../../atoms/inputs/Radio'

const Success = () => (
  <div>
    <h3>Stake Update Successful!</h3>
  </div>
)

const updateOptions = [
  {
    label: "Increase",
    value: "increase"
  },
  {
    label: "Decrease",
    value: "decrease"
  }
]
const getForm = (tag: string, topicTitle: string, currentStake: string) => (submit: any, isValid: boolean) => (
  <Form>
    <div>Update Stake on</div>
    <div>{topicTitle}</div>
    <div>and {tag}</div>
    <div>Current Stake: {currentStake}</div>
    <div style={{padding: '2em 0'}}>
      <Radio
        label="Update"
        name="update"
        options={updateOptions}
      />
    </div>
    <div style={{padding: '2em 0'}}>
      <Text
        label="Update Amount"
        name="amount"
        type="number" 
      />
    </div>
    <Button
      label="Submit Update"
      onClick={submit}
      disabled={!isValid}
    />
  </Form>
)

const getMethodArgs = (stakeIdx: string) => (values: any) => {
  return [stakeIdx, displayToNativeBalance(values.amount)]
}

const UpdateStakeForm = ({ connectedAddress, algernonInstance, tag, topicTitle, stake, onSuccess }: any) => {
  console.log(`instance methods ${Object.keys(algernonInstance.methods)} -- ${typeof algernonInstance.methods.decreaseStake}`)
  const formProps = {
    defaultValues: updateStakeSchema.defaultValues,
    schema: updateStakeSchema.schema,
    getForm: getForm(tag, topicTitle, stake.displayAmount),
    getContractMethod: (values: any) => values.update === 'increase' ? algernonInstance.methods.increaseStake : algernonInstance.methods.reduceStake,
    connectedAddress,
    getMethodArgs: getMethodArgs(stake.id),
    stateEls: {
      successEl: Success
    },
    formOnSuccess: false,
    onSuccess
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

export default UpdateStakeForm