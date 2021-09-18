import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { RecoilRoot } from "recoil";
import { retrieveToken } from "./utils/tokenUtils";
import { createTheme, ThemeProvider } from "@mui/material";
import { green, purple } from "@mui/material/colors";

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

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

export const Providers: React.FC = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </RecoilRoot>
    </ApolloProvider>
  );
};
