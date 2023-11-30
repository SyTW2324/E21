import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';

const getAuth = () => {
    const token = localStorage.getItem('token');
    return token ? `bearer ${token}` : '';
}

export const client = new ApolloClient ({
    link: new HttpLink({
        headers : {
          Authorization: getAuth()
        },
        uri: 'http://localhost:4000'
    }),
    cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
