import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { retrieveToken } from "./utils/tokenUtils";
import { Router } from "react-router";
import { BrowserRouter } from "react-router-dom";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = retrieveToken();
  const authorization = token ? "Bearer " + token : "";
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const Providers: React.FC = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <ChakraProvider>{children}</ChakraProvider>
      </RecoilRoot>
    </ApolloProvider>
  );
};
