import React from 'react'
import { Formik } from 'formik'
import { BasicFormProps } from '../types'

const InnerForm = ({formikProps, formProps}: {formikProps: any, formProps: BasicFormProps}) => {
  {
    const {values, isValid} = formikProps
    const { getForm, getSubmitArgs, submit } = formProps
    
    const onSubmit = () => submit(getSubmitArgs(values))
    return getForm(isValid, onSubmit)
  }
}

const MutationForm = (formProps: BasicFormProps) => {
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