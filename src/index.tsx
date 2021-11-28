import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from 'reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';
import App from 'App';
import { ApolloProvider } from '@apollo/client';
import { client } from 'State/apollo';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CookiesProvider>
        <HelmetProvider>
          <BrowserRouter>
            <RecoilRoot>
              <App />
            </RecoilRoot>
          </BrowserRouter>
        </HelmetProvider>
      </CookiesProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
