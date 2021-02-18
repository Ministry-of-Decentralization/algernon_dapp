import React, {useState} from 'react'
import { Formik } from 'formik'
import { callMethod } from './utils'
import { Web3FormProps, FormStateEls } from '../types'
import LoadingCard from '../../molecules/common/LoadingCard'


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

const Pending = () => <LoadingCard message='Transaction Pending' />

const getContent = (
  getForm: any,
  state: any,
  submit: any,
  isValid: boolean,
  stateEls: FormStateEls,
  formOnSuccess: boolean
  ) => {
  const { successEl, pendingEl, errorEl } = stateEls
  if (state.receipt) {
    return (
      <div>
        {formOnSuccess && getForm(submit)}
        {successEl ? successEl(state.receipt) : <Success />}
      </div>
    )
  } else if (state.error) {
    // @ts-ignore
    return errorEl ? errorEl(state.error) : <Error error={state.error} />
  } else if (state.txHash) {
    return pendingEl ? pendingEl(state.txHash) : <Pending />
  }

  return getForm(submit, isValid)
}

interface InnerFormState {
  receipt: any;
  txHash?: string;
  error: any;
}

const initialState: InnerFormState = {
  receipt: null,
  txHash: undefined,
  error: null,
}


const InnerForm = ({formikProps, formProps}: {formikProps: any, formProps: Web3FormProps}) => {
  const {
    contractMethod,
    connectedAddress,
    methodArgs,
    getMethodArgs,
    getForm,
    stateEls,
    formOnSuccess,
    staticArgs } = formProps
  const {values, setSubmitting, resetForm, isValid} = formikProps
  const [state, setState] = useState(initialState)

  const handleTxHash = (txHash: string) => setState({...state, txHash})
  const handleReceipt = (receipt: any) => {
    console.log(`success tx receipt on broadcast ${JSON.stringify(receipt, null, 2)}`)
    setState({...state, receipt})
  }
  const handleError = (error: any) => setState({...state, error})

  const staticArgsProps = staticArgs || []
  console.log(`in web3form methodArgs ${methodArgs}`)
  const args = getMethodArgs ? getMethodArgs(values) : staticArgsProps.concat(methodArgs.map((arg: string) => values[arg]))
  
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
    stateEls,
    formOnSuccess
    )
}

const Web3Form = ({formProps}: {formProps:Web3FormProps}) => {

  return (
    <Formik
      initialValues={formProps.defaultValues}
      validationSchema={formProps.schema}
      onSubmit={(vals) => console.log(`form was submitted ${vals}`)}
    >
      {(props) => <InnerForm formikProps={props} formProps={formProps} />}
    </Formik>
  )
}

export default Web3Form