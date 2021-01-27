import React from "react";
import App from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://arcane-hamlet-31547.herokuapp.com/"
})

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function provider() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}
