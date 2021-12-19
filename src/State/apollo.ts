import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getCookie } from "./cookie";


const auth = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            jwt: getCookie('jwt')
        }
    }
});

const server = createHttpLink({
    uri: process.env.NODE_ENV === "production"
        ? "https://rojiwon-nomad-instaclone.herokuapp.com/graphql"
        : "http://localhost:4000/graphql"
});

export const client = new ApolloClient({
    link: auth.concat(server),
    cache: new InMemoryCache({
        typePolicies: {
            User: {
                keyFields: (obj) => `${obj.__typename}:${obj.account}`,
            }
        }
    }),
});