import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';

import DisplayData from './DisplayData';

function App() {

  const clientArgs = {
    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/graphql'
  };

  const client = new ApolloClient(clientArgs);

  return (
    <ApolloProvider client={client}>
      <div>
        <DisplayData/>
      </div>
    </ApolloProvider>
  );
}

export default App;
