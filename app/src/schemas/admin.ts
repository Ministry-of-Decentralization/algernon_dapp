import * as Yup from 'yup';

export const ROLE_TYPES = {
  ADMIN: 'DEFAULT_ADMIN_ROLE',
  TAGGER: 'TAGGER_ROLE'
}

export const grantRoleSchema = {
  defaultValues: {
    _addr: ''
  },
  schema: Yup.object({
    _addr: Yup.string().required()
  })
}