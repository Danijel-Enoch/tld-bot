import { request, gql, GraphQLClient } from "graphql-request";

const graphQLClient = new GraphQLClient(
	"https://api.studio.thegraph.com/query/51321/ens-goerli-api/1.2"
);

const singleUserQuery = () => gql`
	query MyQuery {
		transfers {
			to
			tokenId
		}
	}
`;
export const domainNameBuyers = async () => {
	// const variables = {
	// 	address: address,
	// };
	let results;
	results = await graphQLClient.request(singleUserQuery());
	//console.log(results);
	return results.transfers;
};
