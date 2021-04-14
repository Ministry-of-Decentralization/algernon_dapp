### Algernon

Peer to peer learning network.

Take notes as you learn a topic. Review other users notes. Stake tokens to endorse quality content.

Algernon is a layer 2 blockchain dapp which uses the blockchain as the source of truth data layer and centralized components to improve usability.


## Create Content
allow users to create semi-structured content with some of the data stored directly on chain and the rest of the data stored offchain with a hash of the data stored on chain.

## Curate Content (TCR)
allow users to stake tokens against content to help other users find quality content and to earn additional tokens

## Dapp Components

# skale chain
  - a POS ethereum sidechain offering high throughput and gasless transactions
  
# web/mobile client
  - the user gateway through which users can broadcast transactions to the chain, query the graph-node, and interact with the dapp

# the Graph Protocol
  - Tracks transactions on chain and updates a Postgres db

### 3rd Party Libs
  - Graph Protocol
  - Fortmatic

## Running Locally

- configure .env
`cp env.example app/.env`


- install ganache-cli and truffle globally
`npm install -g ganache-cli truffle`


- Start a local ganache instance, inside the root directory
`yarn run-ganache`
the first account listed by ganache is the default admin for the contract


- Deploy smart contracts to ganache instance
`cd contracts/`
`yarn deploy-local`


- Run a theGraph Node
  https://thegraph.com/docs/quick-start
the docker-compose.yml file in graph-node-local/ will run a graph and ipfs node locally
`cd graph-node-local`
`docker-compose up`

- Deploy the subgraph
`cd subgraph/`
`yarn`
`yarn prepare:development && yarn codegen && yarn build`
`yarn create-local`
`yarn deploy-local`

- run the IPFS Proxy
`cd serverless/lambdaIPFSProxy/`
`yarn`
`yarn run-local`

- Run the app
`cd app/`
`yarn`
`yarn start`

### Data Flow
![Data Flow Diagram](images/algernon_data_flow.png)


