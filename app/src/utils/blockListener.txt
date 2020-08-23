import { web3, windowWeb3 }from './web3'
import { BlockHeader } from 'web3-eth'
import { BlockHeaderResponse, BlockResponse, TransactionResponse, TransactionReceipt, LogResponse } from 'web3x-es/formatters'
import AlgernonAbi from '../generated/AlgernonAbi';
import { Address } from 'web3x-es/address';

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

const getBlock: (blockNumber: string) => Promise<BlockResponse<TransactionResponse>> = async (blockNumber) => {
    const block = await  web3.eth.getBlock(blockNumber, true)
    console.log(`got block number ${blockNumber}\nblock::${block}`)
    return block
}

const getBlockNumber = async ():Promise<number>  => {
    return web3.getBlockNumber()
}

const getTransactionsForBlock = async (block: BlockResponse<TransactionResponse>): Promise<any> => {
    if (block.hash == null) {
        throw('block does not have hash')
    }
    return Promise.all(block.transactions.map(
      trx => trx.hash).filter(notEmpty).map(trxHash => {
        console.log(`getting tx ${trxHash} receipt for block ${block.number}`)
        return web3.eth.getTransactionReceipt(trxHash)
        })
      )
}

export const getBlockAndTransactions = async (blockNumber: string): Promise<{block: any, transactions: any}> => {
    const block = await getBlock(blockNumber)
    console.log('block trxs ', block.transactions)
    const transactions = block.transactions.length ? await getTransactionsForBlock(block) : []
    console.log(`got block:: ${JSON.stringify(block, null, 2)}\ntransactions:: ${JSON.stringify(transactions, null, 2)}`)
    return {
        block,
        transactions
    }
}

export const getLogs = async (props:any): Promise<LogResponse[]> => {
  const topics = ['0x8fc004b14aee5c0ca4de94bd14237f561d1b8fcd297828e4cd108d4a558387ef']// [web3.utils.sha3("TagAdded(uint,string,address)")]
  console.log(`topics is ${topics}`)
  const logs = await web3.eth.getPastLogs(
    {
      ...props,
      topics
    })
  console.log(`got ${logs.length} logs ${JSON.stringify(logs)}`)
  return logs
}

export const subscribeToLogs = async (contractAddress: string): Promise<void> => {
    console.log('subscribing ', contractAddress)
    try {

    // @ts-ignore
    const logsSubscription = web3.subscribe("logs", {address: contractAddress})
    logsSubscription.on("data", (log: any) => {
        console.log('got log ', log)
        const decoded = AlgernonAbi.decodeEvent(log)
        console.log('decoded log ', decoded)
    })
    }
    catch (e) {
        console.log('errs sub: ', e)
    }


}

export const listenForBlocks: () => Promise<void> = async () => {
    let blockNumber = await getBlockNumber()
    let blockH = await web3.eth.getBlock(blockNumber, true)
    let block

    const thash = "0x37536cb0596c3f0b3120de5d7ee27722b9d3464ef314feb166b14f98f263adf2"
    console.log('getting    trx ')
    const tx = await web3.getTransaction(thash)
    console.log('tx ', tx)
    const txRec = await web3.getTransactionReceipt(thash)
    console.log('txRec ', typeof txRec)
    
    subscribeToLogs("0x1a3ED6b67288Cb8F737b50E5080EbD31219632BA")
    /** 
    if (blockH.hash == null) {
        throw('dfdsfdsf')
    }
    const blockHString = blockH.hash.toString("hex")
    console.log('blockH , ', blockHString)
    try {
    const trx = await web3.getTransaction(thash)
    console.log('trx ', {...trx, from: trx.from.toString(), to: trx.to != null ? trx.to.toString(): trx})

    } catch (e) {
        console.log('error getting trx ', e.message)
    }

    try {
        const trxRec = await web3.getTransactionReceipt(thash)
        console.log('trx receipt ', trxRec)
    
        } catch (e) {
            console.log('error getting trx rec ', e.message)
        }

    while (true) {
        try {
            console.log('getting block ', blockNumber)
            block = await getBlockAndTransactions(blockNumber)
            //@ts-ignore
            console.log('got block\n', block.block, '\ntransactions\n', block.transactions)

            blockNumber = blockNumber + 1
        } catch (e) {
            // console.log('errorrrrr gettin\n', e.message)
        }

    }
    */
}

/**
 blockHash: "0xea16b08fd6d9db475f013c0944cc131f81601a30d414a2fa48e0844458b24cb1"
blockNumber: 200619
from: Address {buffer: Uint8Array(20)}
gas: 109216
gasPrice: "1000"
hash: "0xd7caf22e64066b19b730c43404cc4f2f78441e7a66aebf1225cfb388892a5879"
input: "0xf73025060000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000a7479706573637269707400000000000000000000000000000000000000000000"
nonce: 24
r: "0xe5386cb54b3eafe31045374e048bbf792b47dd94289788715fbc7cf57c9f743b"
s: "0x7024eea62bf61f8486b6fa8493d4ee38804ca301c994c80df9775708c559621b"
to: Address {buffer: Uint8Array(20)}
transactionIndex: 0
v: "0x0"
value: "0"
 */
export const getTxReceipt: (hash: string) => Promise<void> = async (hash) => {
  const tHash = "0x1a23336999593043f4ac59eb811722bc260f38c49ff94c3c96bc960c8e86d61c"
  try {
  const batch = windowWeb3.createBatch()
  batch.add(web3.eth.getTransactionReceipt.request(hash, function (resp:any) {console.log(`got batch response \n${arguments[0]}\n${JSON.stringify(arguments[1], null, 2)} ${JSON.stringify(resp, null, 2)}`)}))
  batch.add(web3.eth.getTransactionReceipt.request(tHash, function (resp:any) {console.log(`got batch response2 \n${arguments[0]}\n${JSON.stringify(arguments[1], null, 2)} ${JSON.stringify(resp, null, 2)}`)}))

  const batches = await batch.execute()
  console.group(`got some batches ${JSON.stringify(batches, null, 2)}`)
  } catch (e) {
    console.log(`batch request error ${JSON.stringify(e, null, 2)}`)
  }
  // const tx = await web3.eth.getTransactionReceipt(hash)
  // console.log(`got tx ${hash}n${JSON.stringify(tx, null, 2)}`)
}