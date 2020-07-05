import * as Yup from 'yup';

export const tagSchema = Yup.string()
  .min(2, 'Must be at least 2 characters')
  .max(25, 'Must be 15 characters or less')
  .required('Required')

export const basicString = Yup.string()

export const basicStringArray = Yup.array().of(Yup.string())


