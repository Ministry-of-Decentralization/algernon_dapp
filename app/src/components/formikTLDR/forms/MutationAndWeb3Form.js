import React, {useState} from 'react'
import { Formik } from 'formik'
import { callMethod } from './common'

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


const initialState = {
  receipt: null,
  txHash: null,
  error: null,
  offChainPending: false,
  offChainCompleted: false,
  isOpen: false
}

const MutationAndWeb3Form = ({
  defaultValues,
  schema,
  connectedAddress,
  getForm,
  getMutationVariables,
  contractMethod,
  getMethodArgs,
  successEl,
  pendingOnChainEl,
  pendingOffChainEl,
  signatureRequiredEl,
  errorEl,
  formOnSuccess,
  onSuccess,
  triggerEl = null, 
}) => {
  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={schema}
    >
      {(props) => {
        const initialFormState = {...initialState, isOpen: triggerEl ? false :  true}

        const {values, setSubmitting, resetForm, isValid} = props
        const [state, setState] = useState({...initialState})
        
        const handleTxHash = (txHash) => setState({...state, txHash})
        const handleReceipt = (receipt) => setState({...state, receipt})
        const handleError = (error) => setState({...state, error})

        const setOpen = () => setState({...state, isOpen: true})
        const resetAndSetOpen = () => setState({...initialFormState, isOpen: true})

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
          setSubmitting) => (args) => callMethod({
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
      }}
    </Formik>
  )
};

export default MutationAndWeb3Form