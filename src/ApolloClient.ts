import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:3000/graphql",
  }),
  cache: new InMemoryCache(),
});

export { client };
