import React from 'react'
import { Form } from 'formik'
import { Link } from 'react-router-dom'
import { selectWalletSchema, SUPPORTED_WALLETS } from '../../../schemas/wallet'
import Text from '../../atoms/inputs/Text'
import Button from '../../atoms/inputs/buttons/Button'
import BasicForm from '../../formikTLDR/forms/BasicForm'
import FortmaticIcon from '../../atoms/logos/Fortmatic'
import MetaMaskIcon from '../../atoms/logos/MetaMask'
import CardSelect from '../../atoms/inputs/CardSelect'


const walletOptions = [
  {
    icon:FortmaticIcon,
    title:'Fortmatic',
    value: SUPPORTED_WALLETS.FORTMATIC
  },
  {
    icon: MetaMaskIcon,
    title:'MetaMask',
    value: SUPPORTED_WALLETS.METAMASK
  }
]

const getForm = (isValid: boolean, submit: any) => (
  <Form>
    <CardSelect />
    <Button
      onClick={submit}
      disabled={!isValid}
      label="Sign Up" />
  </Form>
)

const getSubmitArgs = (values: any) => {
  return values.walletType
}

const SelectWalletForm = ({selectWallet}: any) => {
  const formProps = {
    defaultValues: selectWalletSchema.defaultValues,
    schema: selectWalletSchema.schema,
    getForm: getForm,
    getSubmitArgs,
    submit: selectWallet,
    stateEls: {}
  }
  return (
    <BasicForm
      {...formProps}
    />
  )
}

export default SelectWalletForm