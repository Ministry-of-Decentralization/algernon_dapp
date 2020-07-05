import ApolloClient from 'apollo-boost';
import { THE_GRAPH_ENDPOINT, ALGERNON_API_ENDPOINT } from '../config';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'User': return object.stakeAddress; // use the `stakeAddress` field as the identifier
      default: return defaultDataIdFromObject(object); // fall back to default handling
    }
  }
});

export const theGraphClient = new ApolloClient({
  uri: THE_GRAPH_ENDPOINT
})

console.log(`algenron api ${ALGERNON_API_ENDPOINT}`)
export default new ApolloClient({
  uri: ALGERNON_API_ENDPOINT,
  cache
});