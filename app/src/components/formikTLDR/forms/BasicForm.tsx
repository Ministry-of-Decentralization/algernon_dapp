import React from 'react'
import { Formik } from 'formik'
import { BasicFormProps } from '../types'

const InnerForm = ({formikProps, formProps}: {formikProps: any, formProps: BasicFormProps}) => {
  {
    const {values, isValid} = formikProps
    const { getForm, getSubmitArgs, submit, cancel } = formProps
    
    const onSubmit = async () => {
      const args  = await getSubmitArgs(values)
      console.log(`subbing ${args.address}`)
      submit(args)
    }
    return getForm(isValid, onSubmit, cancel)
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