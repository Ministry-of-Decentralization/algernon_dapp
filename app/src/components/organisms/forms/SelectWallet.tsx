import React from 'react'
import { Form } from 'formik'
import { selectWalletSchema, SUPPORTED_WALLETS } from '../../../schemas/wallet'
import wallets from '../../../utils/wallets'
import Button from '../../atoms/inputs/buttons/Button'
import BasicForm from '../../formikTLDR/forms/BasicForm'
import FortmaticIcon from '../../atoms/logos/Fortmatic'
import MetaMaskIcon from '../../atoms/logos/MetaMask'
import CardSelect from '../../atoms/inputs/CardSelect'
import Flex from '../../atoms/Flex'
import Modal from '../../atoms/Modal'
import { getAlgernonInstance } from '../../../utils/web3'


const walletOptions = [
  {
    icon: <FortmaticIcon size={6} />,
    title:'Fortmatic',
    value: SUPPORTED_WALLETS.FORTMATIC,
    connectWallet: wallets.FORTMATIC.connectWallet
  },
  {
    icon: <MetaMaskIcon size={6} />,
    title:'MetaMask',
    value: SUPPORTED_WALLETS.METAMASK,
    connectWallet: wallets.METAMASK.connectWallet
  }
]

const getForm = (isValid: boolean, submit: any, close: any) => (
  <Form>
    <CardSelect name='walletType' options={walletOptions} />
    <Flex>
      <Button
        onClick={() => {
          close();
        }}
        label="Cancel" />
      <Button
        onClick={() => {
          submit();
          close();
        }}
        disabled={!isValid}
        label="Sign Up" />
    </Flex>
  </Form>
)

const getSubmitArgs = async (values: any) => {
  // @ts-ignore
  const [wallet, provider] = await wallets[values.walletType].connectWallet()
  // @ts-ignore
  const address = await wallets[values.walletType].getAddress(wallet)
  const algernonInstance = getAlgernonInstance(wallet)
  console.log(`got a wallet ${wallet} -- ${address} -- ${algernonInstance}`)
  return {
    walletType: values.walletType,
    wallet,
    address,
    provider,
    algernonInstance
  }
}

const SelectWalletForm = ({setWallet}: any) => {
  const formProps = {
    defaultValues: selectWalletSchema.defaultValues,
    schema: selectWalletSchema.schema,
    getForm: getForm,
    getSubmitArgs,
    submit: setWallet,
    stateEls: {}
  }

return (
  <Modal 
    triggerText='Not Hot Dog'
    title='Connect Your Wallet'
    contentText=''
    getForm={(cancel: any) => <BasicForm
      {...formProps}
      cancel={cancel}
    /> }
    />
  )
}

export default SelectWalletForm 
