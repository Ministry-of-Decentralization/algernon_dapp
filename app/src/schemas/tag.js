import * as Yup from 'yup';
import { tagSchema } from './common';

export const createTagSchema = {
  defaultValues: {
    tag: ''
  },
  schema: Yup.object({
    tag: tagSchema
  })
}