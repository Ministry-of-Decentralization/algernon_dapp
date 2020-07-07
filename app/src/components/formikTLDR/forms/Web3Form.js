import React, {useState} from 'react'
import { Formik } from 'formik'
import { callMethod } from './common'

/*
interface CallMethodProps {
  contractMethod: any;
  connectedAddress: string;
  args: any[];
  handleTxHash: any;
  handleReceipt: any;
  handleError: any;
  resetForm: any;
  setSubmitting: any;
}

interface FormProps {
  defaultValues: any;
  schema: any;
  connectedAddress: string;
  formArgs: string[];
  staticArgs?: any[];
  contractMethod: any;
  getMethodArgs: any;
}

interface State {
  receipt: any;
  txHash: string | null;
  error: any;
}
*/

const Success = () => (
  <div>
    <h3>Transaction Success!</h3>
  </div>
)

const Error = () => (
  <div>
    <h3>Transaction Error!</h3>
  </div>
)

const Pending = () => (
  <div>
    <h3>Transaction Pending</h3>
  </div>
)

const getContent = (getForm, state, submit, isValid, successEl, pendingEl, errorEl, formOnSuccess) => {

  if (state.receipt) {
    return (
      <div>
        {formOnSuccess && getForm(submit)}
        {successEl ? successEl(state.receipt) : <Success />}
      </div>
    )
  } else if (state.error) {
    return errorEl ? errorEl(state.error) : <Error error={state.error} />
  } else if (state.txHash) {
    return pendingEl ? pendingEl(state.txHash) : <Pending />
  }

  return getForm(submit, isValid)
}

const initialState = {
  receipt: null,
  txHash: null,
  error: null,
}

const Web3Form = ({
    defaultValues,
    schema,
    getForm,
    contractMethod,
    connectedAddress,
    methodArgs,
    staticArgs = [],
    getMethodArgs,
    successEl,
    pendingEl,
    errorEl,
    formOnSuccess
  }) => {

  return (

  <Formik
    initialValues={defaultValues}
    validationSchema={schema}
  >
    {(props) => {
      const {values, setSubmitting, resetForm, isValid} = props
      const [state, setState] = useState(initialState)

      const handleTxHash = (txHash) => setState({...state, txHash})
      const handleReceipt = (receipt) => {
        console.log(`success tx receipt on broadcast ${JSON.stringify(receipt, null, 2)}`)
        setState({...state, receipt})
      }
      const handleError = (error) => setState({...state, error})

      const args = getMethodArgs ? getMethodArgs(values) : staticArgs.concat(methodArgs.map(arg => values[arg]))
      
      const submit = () => isValid ?
        callMethod({
          contractMethod,
          connectedAddress,
          args,
          handleTxHash,
          handleReceipt,
          handleError,
          resetForm,
          setSubmitting
        })
          :
          () => {}
      
      return getContent(
        getForm, 
        state,
        submit,
        isValid,
        successEl,
        pendingEl,
        errorEl,
        formOnSuccess
        )
    }}
  </Formik>
  )
}

export default Web3Form