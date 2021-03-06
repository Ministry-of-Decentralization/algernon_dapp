import * as Yup from 'yup';

export const createStakeSchema = {
  defaultValues: {
    amount: 0
  },
  schema: Yup.object({
    amount: Yup.number().required()
  })
}

export const updateStakeSchema = {
  defaultValues: {
    amount: 0,
    update: 'increase'
  },
  schema: Yup.object({
    amount: Yup.number().required(),
    update: Yup.string().oneOf(['increase', 'decrease']).required()
  })
}
