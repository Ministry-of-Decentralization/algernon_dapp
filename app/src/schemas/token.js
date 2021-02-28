import * as Yup from 'yup';

export const depositSchema = {
  defaultValues: {
    amount: 0
  },
  schema: Yup.object({
    amount: Yup.number().required()

  })
}