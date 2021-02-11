import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import './styles/index.scss';

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { relayStylePagination } from "@apollo/client/utilities";

const httpLink = createHttpLink({
  uri: 'http://robmaurizi.com/wordpress/graphql'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: relayStylePagination(['where', 'first']),
        },
      },
      Category: {
        fields: {
          posts: relayStylePagination(),
        }
      },
      Tag: {
        fields: {
          posts: relayStylePagination(),
        }
      },
      Page: {
        keyArgs: ['id']
      }
    },
  })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
