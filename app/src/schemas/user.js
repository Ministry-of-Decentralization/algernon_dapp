import * as Yup from 'yup';

export const signUpSchema = {
  defaultValues: {
    username: '',
    password: ''
  },
  schema: Yup.object({
    username: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    password: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .min(5, 'Must be at least 5 characters')
      .required('Required')
  })
}

export const profileSchema = {
  defaultValues: {
    username: '',
    description: '',
    organization:  ''
  },
  schema: Yup.object({
    username: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
    description: Yup.string()
      .max(250, 'Must be 250 characters or less'),
    organization: Yup.string()
      .max(25, 'Must be 25 characters or less')
      .min(1, 'Must be at least 5 characters')
  })
}



