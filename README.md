# react-apollo-typed-hooks

[![Node.js](https://github.com/jbhannah/react-apollo-typed-hooks/workflows/Node.js/badge.svg)][workflows-nodejs]

Wrappers for [Apollo][]'s React hooks with simplified typings.

## Usage

**tl;dr**:

- Extend `Mutation` or `Query` with type parameters for the shapes of the
  result data and the allowed parameters for each query or mutation allowed by
  your application.
- Instantiate the classes with the query to execute.
- Use `useQuery` and `useMutation` with the same API provided by
  `@apollo/react-hooks`, but pass the instance instead of the query node. You'll
  get detailed type information for all query and mutation variables and
  results.

```tsx
import * as React from "react";
import gql from "graphql-tag";
import { Query, useQuery } from "react-apollo-typed-hooks";

const QUERY = gql`
  query {
    testQuery {
      ok
    }
  }
`;

class TestQuery extends Query<{ testQuery: { ok: boolean } }, {}> {}

const q = new TestQuery(QUERY);

export const Component = () => {
  const { data } = useQuery(q);

  return <div>{data?.testQuery?.ok && `${data.testQuery.ok}`</div>;
};
```

## Copyright

Copyright © 2020 Jesse B. Hannah. Licensed under the [MIT License](LICENSE).

[apollo]: https://www.apollographql.com
[workflows-nodejs]: https://github.com/jbhannah/react-apollo-typed-hooks/actions?query=workflow%3ANode.js
