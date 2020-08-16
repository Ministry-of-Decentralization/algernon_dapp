import React, {useState} from 'react'
import { Formik } from 'formik'
import { callMethod } from './common'
import { MutationAndWeb3FormProps } from '../types'
import { string } from 'prop-types'


const Success = () => (
  <div>
    <h3>Success!</h3>
  </div>
)

const Error = () => (
  <div>
    <h3>Error creating tag!</h3>
  </div>
)

const PendingOffChain = () => (
  <div>
    <h3>Processing Update</h3>
  </div>
)

const SignatureRequired = () => (
  <div>
    <h3>Confirm Your Transaction In Your Web3 Wallet</h3>
  </div>
)

const PendingOnChain = () => (
  <div>
    <h3>Transaction Pending</h3>
  </div>
)

const getContent = (
  getForm,
  state,
  mutationVariables,
  handleResponse,
  isValid,
  cancelForm,
  successEl,
  pendingOnChainEl,
  pendingOffChainEl,
  signatureRequiredEl,
  errorEl,
  formOnSuccess,
  triggerEl) => {
  if (!state.isOpen && triggerEl) {
    return triggerEl
  }

  if (state.receipt) {
    return (
      <div>
        {triggerEl}
        { successEl ? successEl(state.receipt) : <Success /> }
      </div>
    )
  } else if (state.error) {
    return errorEl ? errorEl(state.error) : <Error error={state.error} />
  } else if (state.txHash) {
    return pendingOnChainEl ? pendingOnChainEl(state.txHash) : <PendingOnChain />
  } else if (state.offChainCompleted) {
    return signatureRequiredEl ? signatureRequiredEl() : <SignatureRequired />
  } else if (state.offChainPending) {
    return pendingOffChainEl ? pendingOffChainEl() : <PendingOffChain />
  }
  

  return getForm(mutationVariables, isValid, handleResponse, cancelForm)
}




const handleMutationResponse = (
  executeTransaction,
  getMethodArgs
) => (response) => {
  console.log(`handling mutation response${response}`)
  const methodArgs = getMethodArgs(response)
  console.log(`handling mutation method args${methodArgs}`)


  executeTransaction(methodArgs)
}

interace InnerFormState {
  receipt: any;
  txHash?: string;
  error: any;
  offChainPending: boolean;
  offChainCompleted: boolean;
  isOpen: boolean;
}

const defaultState = {
  receipt: null,
  txHash: null,
  error: null,
  offChainPending: false,
  offChainCompleted: false,
  isOpen: false
}

const InnerForm = ({formikProps, formProps}) => {
    const initialFormState = {...initialState, isOpen: triggerEl ? false :  true}

    const {values, setSubmitting, resetForm, isValid} = formikProps
    const [state, setState] = useState({...defaultState})
    
    const handleTxHash = (txHash: string) => setState({...state, txHash})
    const handleReceipt = (receipt: any) => setState({...state, receipt})
    const handleError = (error: any) => setState({...state, error})

    const setOpen = () => setState({...state, isOpen: true})
    // const resetAndSetOpen = () => setState({...initialFormState, isOpen: true})

    const cancelForm = () => {
      resetForm()
      setState({...initialFormState})
    }

    triggerEl = triggerEl && <span onClick={setOpen}>{triggerEl}</span>
    

    const executeTransaction = (
      contractMethod,
      connectedAddress,
      handleTxHash,
      handleReceipt,
      handleError,
      resetForm,
      onSuccess,
      setSubmitting
      ) => (args) => callMethod({
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
      successEl,
      pendingOnChainEl,
      pendingOffChainEl,
      signatureRequiredEl,
      errorEl,
      formOnSuccess,
      triggerEl
      )
}

const MutationAndWeb3Form = (formProps: MutationAndWeb3FormProps) => {
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