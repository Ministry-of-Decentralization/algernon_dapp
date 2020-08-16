import { any } from "prop-types";

interface FormStateEls {
  successEl?: JSX.Element;
  pendingEl?: JSX.Element;
  errorEl?: JSX.Element;
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
  contractMethod: string;
  connectedAddress: string;
  methodArgs: any;
  staticArgs: any;
  getMethodArgs: any;
  stateEls: FormStateEls;
  formOnSuccess: boolean;
}

interface MutationAndWeb3FormStateEls {
  successEl?: JSX.Element;
  pendingOnChainEl?: JSX.Element;
  pendingOffChainEl?: JSX.Element;
  signatureRequiredEl?: JSX.Element;
  errorE?: JSX.Element;
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