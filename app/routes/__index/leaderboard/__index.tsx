import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

export async function loader() {  
    return json({graphQLEndpoint: process.env.GRAPHQL_ENDPOINT});
}
export default function Index() {
    const { graphQLEndpoint } = useLoaderData();

    const graphQLClient = new ApolloClient({
        ssrMode: true,
        link: createHttpLink({
        uri: graphQLEndpoint,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        }),
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={graphQLClient}>
            <Outlet />
        </ApolloProvider>
    )

}