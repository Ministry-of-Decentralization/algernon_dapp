import * as Yup from 'yup';
import { tagSchema } from './common';

export const createTagSchema = {
  defaultValues: {
    tag: '',
    parent: 0
  },
  schema: Yup.object({
    tag: tagSchema,
    parent: Yup.number().required()

  })
}