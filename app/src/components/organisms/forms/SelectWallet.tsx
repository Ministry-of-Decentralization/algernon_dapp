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
import { getAlgernonInstance, getAlgerTokenInstance } from '../../../utils/web3'
import config from '../../../config'

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

const isValidProviderNetwork = (provider: any): boolean => {

  // confirm  the provider chainId matches if not fortmatic
  if (!provider.isFortmatic && parseInt(provider.chainId, 16) !== config.chainId) {
    return false
  }

  return true
}

const getForm = (isValid: boolean, submit: any, close: any, errors: any) => {
  console.log(`errors are ${JSON.stringify(errors, null, 2)}`)
  if (errors.providerNetwork) {
    return (
      <div>
        <div>
          {errors.providerNetwork} Please connect your wallet to the {config.networkName} network and reload the page.
        </div>
        <Button
            onClick={() => {
              close();
            }}
            style={{marginRight: '2em'}}
            variant='outlined'
            label="Cancel" />
      </div>
    )
  }
  return (
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
            onClick={async () => {
              const success = await submit();
              if (success) {
                close()
              }
            }}
            disabled={!isValid}
            label="Sign In" />
        </Flex>
      </Form>
    </div>
  )
}

const getSubmitArgs = async (values: any, setErrors: any) => {
  // @ts-ignore
  const [wallet, provider] = await wallets[values.walletType].connectWallet()

  const isValidNetwork = isValidProviderNetwork( provider )

  if (!isValidNetwork) {
    setErrors({providerNetwork: 'Network Mismatch'})
    return
  }
  console.log(`got provider: ${config.chainId} -- ${provider.chainId}`)
  // @ts-ignore
  const address = await wallets[values.walletType].getAddress(wallet)
  const algernonInstance = getAlgernonInstance(wallet)
  console.log(`gt algernon instance ${JSON.stringify(algernonInstance, null, 2)}`)
  const algerTokenInstance = getAlgerTokenInstance(wallet)
  console.log(`gt algerToken instance ${algerTokenInstance}`)
  const isAdmin = await algernonInstance.methods.isAdmin(address).call()
  const isTagger = await algernonInstance.methods.isTagger(address).call()

  const args = {
    walletType: values.walletType,
    wallet,
    address,
    isAdmin,
    isTagger,
    provider,
    algernonInstance,
    algerTokenInstance
  }

  return args
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
