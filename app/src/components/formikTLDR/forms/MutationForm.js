import React, {useState} from 'react'
import { Formik } from 'formik'

const onSubmit = ({setSubmitting, setState, resetForm })  => (response, error) => {
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

const Success = () => (
  <div>
    <h3>Success!</h3>
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

const getContent = (
  getForm,
  state,
  mutationVariables,
  handleResponse,
  isValid,
  successEl,
  pendingEl,
  errorEl,
  formOnSuccess,
  onSuccess
  ) => {
    console.log(`get content in mutform ${JSON.stringify(state, null, 2)}`)
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
    return errorEl ? errorEl(state.error) : <Error error={state.error} />
  } else if (state.pending) {
    return pendingEl ? pendingEl() : <Pending />
  }

  return getForm(mutationVariables, isValid, handleResponse)
}

const MutationForm = ({
  defaultValues,
  schema,
  getForm,
  staticMutationVariables,
  successEl,
  pendingEl,
  errorEl,
  formOnSuccess,
  onSuccess = () => {}
}) => {
  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={schema}
    >
      {(props) => {
        const {values, setSubmitting, resetForm, isValid} = props
        const [state, setState] = useState({response: null, pending:null, errror: null})
        
        const handleResponse = onSubmit({setSubmitting, setState, resetForm})
        console.log(`in sign up values ${JSON.stringify(values, null, 2)}\n${JSON.stringify(staticMutationVariables, null, 2)}`)
        const mutationVariables = {...values, ...staticMutationVariables}

        return getContent(
          getForm,
          state,
          mutationVariables,
          handleResponse,
          isValid,
          successEl,
          pendingEl,
          errorEl,
          formOnSuccess,
          onSuccess
          ) 
      }}
    </Formik>
  );
};

export default MutationForm