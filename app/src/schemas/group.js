const contract = [
  {
    name: 'fee',
    label: 'Enrollment Fee',
    type: 'number',
    required: true,
    default: 0
  },
  {
    name: 'limit',
    label: 'Enrollment Limit',
    type: 'number',
    required: true,
    default: 0
  },
  {
    name: 'tags',
    label: 'Tags',
    type: 'select',
    multiple: true,
    default: [],
    options: []
  }
]

const offChain = [
  {
    name: 'title',
    label: 'Title',
    type: 'string',
    require: false,
    default: ''
  },
  {
    name: 'url',
    label: 'URL',
    type: 'url',
    require: false,
    default: ''
  },
  {
    name: 'description',
    label: 'Description',
    type: 'string',
    multiline: true,
    require: false,
    default: ''
  },
  {
    name: 'content',
    label: 'Content',
    type: 'richText',
    required: true,
    default: ''
  }
]


export default {
  contract,
  offChain
}
