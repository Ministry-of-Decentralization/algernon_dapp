import React, {useState} from 'react'
import { Formik } from 'formik'
import { callMethod } from './utils'
import { Success } from './common'
import { CallAndWeb3FormProps, MutationAndWeb3FormStateEls } from '../types'
import LoadingCard from '../../molecules/common/LoadingCard'

const Error = () => (
  <div>
    <h3>Error!</h3>
  </div>
)

const PendingOffChain = () => <LoadingCard message='Processing Update' />

const SignatureRequired = () => (
  <div>
    <h3>Confirm Your Transaction In Your Web3 Wallet</h3>
  </div>
)

const PendingOnChain = () => <LoadingCard message='Saving Update' />

const getContent = (
  getForm: any,
  state: any,
  submitForm: any,
  isValid: boolean,
  cancelForm: any,
  stateEls: MutationAndWeb3FormStateEls,
  formOnSuccess = false,
  triggerEl?: JSX.Element) => {
  if (false && !state.isOpen && triggerEl) {
    return triggerEl
  }
  console.log(`getting content ${JSON.stringify(state, null, 2)}`)
  if (state.receipt) {
    return (
      <div>
        { stateEls.successEl ? stateEls.successEl({cancel: cancelForm, receipt: state.receipt }) : <Success /> }
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
  

  return getForm(submitForm, isValid, cancelForm)
}

const handleCallResponse = (
  executeTransaction: any,
  getMethodArgs: any
) => (response: any) => {
  console.log(`handling call response${response}`)
  const methodArgs = getMethodArgs(response)
  console.log(`handling call method args${methodArgs}`)


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

const InnerForm = ({formikProps, formProps}: {formikProps: any, formProps: CallAndWeb3FormProps}) => {
  const {
    contractMethod,
    connectedAddress,
    onSuccess,
    getMethodArgs,
    getForm,
    stateEls,
    formOnSuccess,
    call,
    getCallVariables } = formProps
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
    formProps.cancelForm()
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

  const handleResponse = handleCallResponse(
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



  const callVariables = getCallVariables({...values})

  const submitForm = async () => {
    setState({...state, offChainPending: true})
    const callResponse = await call(callVariables)
    setState({...state, offChainPending: false, offChainCompleted: true})
    console.log(`inside CallAndWeb3Form got call response\n${callResponse}`)
    handleResponse(callResponse)
  }

  return getContent(
    getForm,
    state,
    submitForm, 
    isValid,
    cancelForm, 
    stateEls,
    formOnSuccess,
    triggerEl
  )
}

const CallAndWeb3Form = ({formProps}:{formProps: CallAndWeb3FormProps}) => {
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

export default CallAndWeb3Form