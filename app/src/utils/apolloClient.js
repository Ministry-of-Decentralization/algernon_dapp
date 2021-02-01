import ApolloClient from 'apollo-boost';
import config from '../config'

export const theGraphClient = new ApolloClient({
  uri: config.theGraphEndpoint
})

export default theGraphClient