import React from 'react'
import web3 from 'web3'
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
  <div style={{width: "22em", padding: '1em'}}>
  <Form>
    <CardSelect name='walletType' options={walletOptions} />
    <Flex justifyContent="flex-end" mt='2em'>
      <Button
        onClick={() => {
          close();
        }}
        style={{marginRight: '2em'}}
        variant='outlined'
        label="Cancel" />
      <Button
        onClick={() => {
          submit();
          close();
        }}
        disabled={!isValid}
        label="Sign In" />
    </Flex>
  </Form>
  </div>
)

const getSubmitArgs = async (values: any) => {
  // @ts-ignore
  const [wallet, provider] = await wallets[values.walletType].connectWallet()
  // @ts-ignore
  const address = await wallets[values.walletType].getAddress(wallet)
  const algernonInstance = getAlgernonInstance(wallet)
  const isAdmin = await algernonInstance.methods.isAdmin(address).call()
  const isTagger = await algernonInstance.methods.isTagger(address).call()

  return {
    walletType: values.walletType,
    wallet,
    address,
    isAdmin,
    isTagger,
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
    triggerText='Sign In'
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
