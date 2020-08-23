import React, {useState} from 'react'
import { Formik } from 'formik'
import { MutationFormProps, FormStateEls } from '../types'
import { Success, Error, Pending } from './common'

const onSubmit = ({ setSubmitting, setState, resetForm }: { setSubmitting: any, setState: any, resetForm: any })  => (response: any, error: any) => {
  console.log(`got update user pro response ${JSON.stringify(response)}`)
  if (response.loading) {
  } else if (error) {
    setState({error})
    setSubmitting(false)
  } else {
    setSubmitting(false)
    resetForm()
    setState({response: response})
  }
}

const getContent = (
  getForm: any,
  state: any,
  mutationVariables: any,
  handleResponse: any,
  isValid: boolean,
  stateEls: FormStateEls,
  formOnSuccess: boolean,
  onSuccess: any
  ) => {
  const {
    successEl,
    pendingEl,
    errorEl } = stateEls
  
  if (state.response) {
    console.log(`mutations success ${onSuccess}`)
    onSuccess()
    return (
      <div>
        {formOnSuccess && getForm(mutationVariables, isValid, handleResponse)}
        {successEl ? successEl(state.response) : <Success />}
      </div>
    )
  } else if (state.error) {
    // @ts-ignore
    return errorEl ? errorEl(state.error) : <Error error={state.error} />
  } else if (state.pending) {
    return pendingEl ? pendingEl() : <Pending />
  }

  return getForm(mutationVariables, isValid, handleResponse)
}

const InnerForm = ({formikProps, formProps}: {formikProps: any, formProps: MutationFormProps}) => {
  {
    const {values, setSubmitting, resetForm, isValid} = formikProps
    const [state, setState] = useState({response: null, pending:null, errror: null})
    
    const handleResponse = onSubmit({setSubmitting, setState, resetForm})
    const mutationVariables = {...values, ...formProps.staticMutationVariables}

    return getContent(
      formProps.getForm,
      state,
      mutationVariables,
      handleResponse,
      isValid,
      formProps.stateEls,
      formProps.formOnSuccess,
      formProps.onSuccess
      ) 
  }
}

const MutationForm = (formProps: MutationFormProps) => {
  return (
    <Formik
      initialValues={formProps.defaultValues}
      validationSchema={formProps.schema}
      onSubmit={(vals) => console.log(`form was submitted ${vals}`)}
    >
      {(props) => <InnerForm formikProps={props} formProps={formProps} />}
    </Formik>
  );
};

export default MutationForm