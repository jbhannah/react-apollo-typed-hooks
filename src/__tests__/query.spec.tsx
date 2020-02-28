import { MockedProvider } from "@apollo/react-testing";
import { render as _render, waitForElement } from "@testing-library/react";
import { ApolloError } from "apollo-client";
import gql from "graphql-tag";
import * as React from "react";
import { Query, useQuery } from "../query";

class QueryTest extends Query<{ testQuery: { ok: boolean } }, {}> {}

const QUERY = gql`
  query TestQuery {
    testQuery {
      ok
    }
  }
`;
const QUERY_TEST = new QueryTest(QUERY);

const onError = jest.fn();

const Component = ({
  onError = undefined
}: {
  onError: (error: ApolloError) => void;
}) => {
  const { data, error } = useQuery(
    QUERY_TEST,
    onError ? { onError } : undefined
  );

  return (
    <div>
      {error && <span data-testid="error" />}
      {data?.testQuery?.ok && (
        <span data-testid="ok">{`${data.testQuery.ok}`}</span>
      )}
    </div>
  );
};

const render = (
  result = {},
  onError: (error: ApolloError) => void = undefined
) =>
  _render(
    <MockedProvider
      addTypename={false}
      mocks={[
        {
          request: { query: QUERY },
          result
        }
      ]}
    >
      <Component onError={onError} />
    </MockedProvider>
  );

describe("Query", () => {
  it("performs the query", async () => {
    const { getByTestId } = render({ data: { testQuery: { ok: true } } });
    const result = await waitForElement(() => getByTestId("ok"));
    expect(result.textContent).toBe("true");
  });

  it("accepts options and overrides default options", async () => {
    const { getByTestId } = render(
      {
        errors: [{ message: "throws an error", path: ["testQuery"] }]
      },
      onError
    );

    await waitForElement(() => getByTestId("error"));
    expect(onError).toBeCalled();
    expect(() => getByTestId("ok")).toThrowError();
  });
});
