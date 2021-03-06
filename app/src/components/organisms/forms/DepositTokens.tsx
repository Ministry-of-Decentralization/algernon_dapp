import React from 'react'
import { Form } from 'formik'
import { depositSchema } from '../../../schemas/token'
import Web3Form from '../../formikTLDR/forms/Web3Form'
import Text from '../../atoms/inputs/Text'
import Button from '../../atoms/inputs/buttons/Button'
import { displayToNativeBalance } from '../../../utils/formatters'
import Modal from '../../atoms/Modal'


const Success = (onComplete: any) => () => {
  onComplete()
  return (
    <div>
      <h3>Deposit Successful!</h3>
    </div>
  )
}

const getForm = (submit: any, isValid: boolean) => (
  <Form>
    <div style={{padding: '2em 0'}}>
      <Text
        label="Amount"
        name="amount"
        type="string" 
      />
    </div>
    <Button
      label="Deposit"
      onClick={submit}
      disabled={!isValid}
    />
  </Form>
)

const getMethodArgs = (to: string, data: string) => (values: any) => {
  const nativeAmount = displayToNativeBalance(values.amount)
  return[ to, nativeAmount, data ]
}
const DepositTokensForm = ({ connectedAddress, algerTokenInstance, to, onComplete }: any) => {
  const formProps = {
    defaultValues: depositSchema.defaultValues,
    schema: depositSchema.schema,
    getForm,
    contractMethod: algerTokenInstance.methods.send,
    connectedAddress,
    getMethodArgs: getMethodArgs(to, "0x0"),
    stateEls: {
      successEl: Success(onComplete)
    },
    formOnSuccess: false
  }
  return (
    <Modal 
      triggerText='Deposit ALG'
      title='Deposit'
      contentText=''
      getForm={() => {
        return (
          <Web3Form
            // @ts-ignore
            formProps={formProps}
          />
        )
      }}
    />
  )
}

export default DepositTokensForm