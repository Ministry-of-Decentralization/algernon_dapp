import * as Yup from 'yup';

export const SUPPORTED_WALLETS = {
  METAMASK: 'METAMASK',
  FORTMATIC: 'FORTMATIC'
}

export const selectWalletSchema = {
  defaultValues: {
    walletType: '',
  },
  schema: Yup.object({
    walletType: Yup.string().oneOf(Object.keys(SUPPORTED_WALLETS))
      .required('Required')
  })
}