import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import React from 'react'
import { EXAMPLE_SERVICE } from '../../Constants'

const GqlClient: React.FC = ({ children }): JSX.Element => {
  const client = new ApolloClient({
    uri: EXAMPLE_SERVICE
  })


  return <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
}

export default GqlClient
