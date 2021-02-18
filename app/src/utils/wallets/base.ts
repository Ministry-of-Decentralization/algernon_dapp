const base =  {
  getAddress: async (wallet: any) => {
    const [ address ] = await wallet.eth.getAccounts()
    return address;
  }
}

export default base