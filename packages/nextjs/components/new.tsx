"use client";

import { cacheExchange, fetchExchange } from "@urql/core";
import { createClient, gql } from "urql";

const client = createClient({
  url: "https://gateway-arbitrum.network.thegraph.com/api/e1c1034a567ce7f50c6971ee5fcb5798/subgraphs/id/5XqPmWe6gjyrJtFn9cLy237i4cWw2j9HcUJEXsP5qGtH",
  exchanges: [cacheExchange, fetchExchange],
});

const DATA_QUERY = gql`
  {
    domains(first: 5, orderBy: name, orderDirection: asc, where: { name_starts_with: "done" }) {
      id
      name
      labelName
      labelhash
    }
  }
`;

const New = async () => {
  const result = await client.query(DATA_QUERY, {}).toPromise();
  if (result.error) {
    return <div>Error: {result.error.message}</div>;
  } else
    return (
      <div>
        {result.data.domains.map((domain: any) => (
          <div key={domain.id}>
            <h2>{domain.name}</h2>
          </div>
        ))}
      </div>
    );
};

export default New;
