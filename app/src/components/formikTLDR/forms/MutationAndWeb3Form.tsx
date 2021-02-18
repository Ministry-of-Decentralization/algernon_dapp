import React, {useState} from 'react'
import { Formik } from 'formik'
import { callMethod } from './utils'
import { Success } from './common'
import { MutationAndWeb3FormProps, MutationAndWeb3FormStateEls } from '../types'
import LoadingCard from '../../molecules/common/LoadingCard'

const Error = () => (
  <div>
    <h3>Error!</h3>
  </div>
)

const PendingOffChain = () => <LoadingCard message='Transaction Pending' />


const SignatureRequired = () => (
  <div>
    <h3>Confirm Your Transaction In Your Web3 Wallet</h3>
  </div>
)

const PendingOnChain = () => <LoadingCard message='Transaction Pending' />

const getContent = (
  getForm: any,
  state: any,
  mutationVariables: any,
  handleResponse: any,
  isValid: boolean,
  cancelForm: any,
  stateEls: MutationAndWeb3FormStateEls,
  formOnSuccess = false,
  triggerEl?: JSX.Element) => {
  if (!state.isOpen && triggerEl) {
    return triggerEl
  }

  if (state.receipt) {
    return (
      <div>
        {triggerEl}
        { stateEls.successEl ? stateEls.successEl(state.receipt) : <Success /> }
      </div>
    )
  } else if (state.error) {
    // @ts-ignore
    return stateEls.errorEl ? stateEls.errorEl(state.error) : <Error error={state.error} />
  } else if (state.txHash) {
    return stateEls.pendingOnChainEl ? stateEls.pendingOnChainEl(state.txHash) : <PendingOnChain />
  } else if (state.offChainCompleted) {
    return stateEls.signatureRequiredEl ? stateEls.signatureRequiredEl() : <SignatureRequired />
  } else if (state.offChainPending) {
    return stateEls.pendingOffChainEl ? stateEls.pendingOffChainEl() : <PendingOffChain />
  }
  

  return getForm(mutationVariables, isValid, handleResponse, cancelForm)
}

const handleMutationResponse = (
  executeTransaction: any,
  getMethodArgs: any
) => (response: any) => {
  console.log(`handling mutation response${response}`)
  const methodArgs = getMethodArgs(response)
  console.log(`handling mutation method args${methodArgs}`)


  executeTransaction(methodArgs)
}

interface InnerFormState {
  receipt: any;
  txHash?: string;
  error: any;
  offChainPending: boolean;
  offChainCompleted: boolean;
  isOpen: boolean;
}

const defaultState:InnerFormState = {
  receipt: null,
  txHash: undefined,
  error: null,
  offChainPending: false,
  offChainCompleted: false,
  isOpen: false
}

const InnerForm = ({formikProps, formProps}: {formikProps: any, formProps: MutationAndWeb3FormProps}) => {
  const {
    contractMethod,
    connectedAddress,
    onSuccess,
    getMethodArgs,
    getForm,
    stateEls,
    formOnSuccess,
    getMutationVariables } = formProps
  const initialFormState = {...defaultState, isOpen: formProps.triggerEl ? false :  true}

  const {values, setSubmitting, resetForm, isValid} = formikProps
  const [state, setState] = useState({...initialFormState})
  
  const handleTxHash = (txHash: string) => setState({...state, txHash})
  const handleReceipt = (receipt: any) => setState({...state, receipt})
  const handleError = (error: any) => setState({...state, error})

  const setOpen = () => setState({...state, isOpen: true})
  // const resetAndSetOpen = () => setState({...initialFormState, isOpen: true})

  const cancelForm = () => {
    resetForm()
    setState({...initialFormState})
  }

  const triggerEl = formProps.triggerEl && <span onClick={setOpen}>{formProps.triggerEl}</span>
  

  const executeTransaction = (
    contractMethod: string,
    connectedAddress: string,
    handleTxHash: any,
    handleReceipt: any,
    handleError: any,
    resetForm: any,
    onSuccess: any,
    setSubmitting: any
    ) => (args: any) => callMethod({
    contractMethod,
    connectedAddress,
    args,
    handleTxHash,
    handleReceipt,
    handleError,
    resetForm,
    onSuccess,
    setSubmitting
  })

  const handleResponse = handleMutationResponse(
    executeTransaction(
      contractMethod,
      connectedAddress,
      handleTxHash,
      handleReceipt,
      handleError,
      resetForm,
      onSuccess,
      setSubmitting
    ),
    getMethodArgs(values)
  )

  const mutationVariables = getMutationVariables({...values})

  return getContent(
    getForm,
    state,
    mutationVariables,
    handleResponse,
    isValid,
    cancelForm, 
    stateEls,
    formOnSuccess,
    triggerEl
  )
}

const MutationAndWeb3Form = ({formProps}:{formProps: MutationAndWeb3FormProps}) => {
  return (
    <Formik
      initialValues={formProps.defaultValues}
      validationSchema={formProps.schema}
      onSubmit={(vals) => console.log(`form was submitted ${vals}`)}
    >
      {formikProps => <InnerForm formikProps={formikProps} formProps={formProps} />}
    </Formik>
  )
};

export default MutationAndWeb3Form