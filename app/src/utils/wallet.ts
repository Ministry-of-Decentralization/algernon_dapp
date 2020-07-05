import { ethers } from 'ethers'

export const createWallet = (): ethers.Wallet => ethers.Wallet.createRandom()

export const walletFromEncyptedJSON = (json: string, password: string)  => ethers.Wallet.fromEncryptedJson(json, password)
