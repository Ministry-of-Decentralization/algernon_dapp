import * as Yup from 'yup';
import { basicString, basicStringArray } from './common';

const title = Yup.string()
  .max(80, 'Cannot be more than 80 characters')
  .min(5, 'Must be at least 5 characters')
  .required('Required')

const description = Yup.string()
  .max(250, 'Must be 250 characters or less') 

const url = Yup.string()
  .max(250, 'Cannot be more than 250 characters')
  .min(3, 'Must be at least 3 characters')

export const createTopicSchema = {
  defaultValues: {
    tags: [],
    title: '',
    description:'',
    url: '',
    notes: '',
    supports: [],
    requires:[]
  },
  contractFields: [
    'tags'
  ],
  contentFields: [
    'title',
    'description',
    'url',
    'notes',
    'supports',
    'requires'
  ],
  schema: Yup.object({
    tags: basicStringArray,
    title,
    description,
    url,
    notes: basicString,
    supports: basicStringArray,
    requires: basicStringArray
  })
}

export const updateTopicMetaSchema = {
  contractFields: [
    'tags'
  ],
  contentFields: [
    'title',
    'description',
    'url',
    'notes',
    'supports',
    'requires'
  ],
  schema: Yup.object({
    title,
    description,
    url,
    tags: basicStringArray,
    supports: basicStringArray,
    requires: basicStringArray
  })
}

export const updateTopicNotesSchema = {
  contractFields: [
    'tags'
  ],
  contentFields: [
    'title',
    'description',
    'url',
    'notes',
    'supports',
    'requires'
  ],
  schema: Yup.object({
    notes: basicString
  })
}
