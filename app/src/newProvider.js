https://gist.github.com/rekmarks/d318677c8fc89e5f7a2f526e00a0768a
// Running on the page, in the browser
// All of these APIs will go live during the week of November 25, 2019

if (!ethereum || !ethereum.isMetaMask) {
    throw new Error('Please install MetaMask.')
  }
  
  /*********************************************************/
  /* Handle chain (network) and chainChanged, per EIP 1193 */
  /*********************************************************/
  
  let currentChainId = null
  ethereum.send('eth_chainId')
    .then(handleChainChanged)
    .catch(err => console.error(err)) // This should never happen
  
  ethereum.on('chainChanged', handleChainChanged)
  
  function handleChainChanged (chainId) {
  
    if (currentChainId !== chainId) {
  
      currentChainId = chainId
      // Run any other necessary logic...
    }
  }
  
  /**********************************************************/
  /* Handle user accounts and accountsChanged, per EIP 1193 */
  /**********************************************************/
  
  let currentAccount = null
  ethereum.send('eth_accounts')
    .then(handleAccountsChanged)
    .catch(err => {
      // In the future, maybe in 2020, this will return a 4100 error if
      // the user has yet to connect
      if (err.code === 4100) { // EIP 1193 unauthorized error
        console.log('Please connect to MetaMask.')
      } else {
        console.error(err)
      }
    })
  
  ethereum.on('accountsChanged', handleAccountsChanged)
  
  // For now, 'eth_accounts' will continue to always return an array
  function handleAccountsChanged (accounts) {
  
    if (accounts.length === 0) {
  
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.')
  
    } else if (accounts[0] !== currentAccount) {
  
      currentAccount = accounts[0]
      // Run any other necessary logic...
    }
  }
  
  /***********************************/
  /* Handle connecting, per EIP 1102 */
  /***********************************/
  
  // You should only attempt to connect in response to user interaction,
  // such as a button click. Otherwise, you're popup-spamming the user
  // like it's 1999.
  // If you can't retrieve the user's account(s), you should encourage the user
  // to initiate a connection attempt.
  document.getElementById('connectButton', connect)
  
  function connect () {
  
    // This is equivalent to ethereum.enable()
    ethereum.send('eth_requestAccounts')
      .then(handleAccountsChanged)
      .catch(err => {
        if (err.code === 4001) { // EIP 1193 userRejectedRequest error
          console.log('Please connect to MetaMask.')
        } else {
          console.error(err)
        }
      })
  }