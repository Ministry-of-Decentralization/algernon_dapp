export interface FormStateEls {
  successEl?: any;
  pendingEl?: any;
  errorEl?: any;
}

export interface BasicFormProps {
  defaultValues: any;
  schema: any;
  getForm: any;
  stateEls: FormStateEls;
  submit: any;
  getSubmitArgs: any;
  cancel: any;
}

export interface MutationFormProps {
  defaultValues: any;
  schema: any;
  getForm: any;
  staticMutationVariables: any;
  stateEls: FormStateEls;
  formOnSuccess: boolean;
  onSuccess?: any;
}

export interface Web3FormProps {
  defaultValues: any;
  schema: any;
  getForm: any;
  contractMethod?: string;
  getContractMethod?: any;
  connectedAddress: string;
  methodArgs?: any;
  staticArgs?: any;
  getMethodArgs?: any;
  stateEls: FormStateEls;
  formOnSuccess: boolean;
  cancelForm?: any
  onSuccess?: any
}

export interface MutationAndWeb3FormStateEls {
  successEl?: any;
  pendingOnChainEl?: any;
  pendingOffChainEl?: any;
  signatureRequiredEl?: any;
  errorEl?: any;
}

export interface MutationAndWeb3FormProps {
  defaultValues: any;
  schema: any;
  connectedAddress: string;
  getForm: any;
  getMutationVariables: any;
  contractMethod: string;
  getMethodArgs: any;
  stateEls: MutationAndWeb3FormStateEls;
  formOnSuccess: boolean;
  onSuccess: any;
  triggerEl?: JSX.Element; 
}

export interface CallAndWeb3FormProps {
  defaultValues: any;
  schema: any;
  connectedAddress: string;
  getForm: any;
  getCallVariables: any;
  call: any;
  contractMethod: string;
  getMethodArgs: any;
  stateEls: MutationAndWeb3FormStateEls;
  formOnSuccess: boolean;
  onSuccess: any;
  triggerEl?: JSX.Element;
  cancelForm?: any;
}