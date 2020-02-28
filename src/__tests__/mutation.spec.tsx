import { MockedProvider } from "@apollo/react-testing";
import { render as _render, waitForElement } from "@testing-library/react";
import { ApolloError } from "apollo-client";
import gql from "graphql-tag";
import * as React from "react";
import { Mutation, useMutation } from "../mutation";

class Catcher extends Mutation<{ catcher: { ok: boolean } }, {}> {}

const QUERY = gql`
  mutation Catcher {
    catcher {
      ok
    }
  }
`;
const CATCHER = new Catcher(QUERY);

const onError = jest.fn();

const Component = ({
  onError = undefined
}: {
  onError: (error: ApolloError) => void;
}) => {
  const [catcher, { data, error }] = useMutation(
    CATCHER,
    onError ? { onError } : undefined
  );
  const catches = () => catcher();

  return (
    <div>
      {data?.catcher?.ok && (
        <span data-testid="ok">{`${data.catcher.ok}`}</span>
      )}
      {error && <span data-testid="error" />}
      <button data-testid="catches" onClick={catches} />
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
      mocks={[{ request: { query: QUERY }, result }]}
    >
      <Component onError={onError} />
    </MockedProvider>
  );

describe("Mutation", () => {
  it("runs the mutation", async () => {
    const { getByTestId } = render({ data: { catcher: { ok: true } } });

    const button = getByTestId("catches");
    button.click();

    const result = await waitForElement(() => getByTestId("ok"));
    expect(result.textContent).toBe("true");
    expect(() => getByTestId("error")).toThrowError();
  });

  it("swallows errors by default", async () => {
    const { getByTestId } = render({
      errors: [{ message: "throws an error", path: ["catcher"] }]
    });

    const button = getByTestId("catches");
    button.click();

    await waitForElement(() => getByTestId("error"));
    expect(() => getByTestId("ok")).toThrowError();
  });

  it("accepts options and overrides default options", async () => {
    const { getByTestId } = render(
      {
        errors: [{ message: "throws an error", path: ["catcher"] }]
      },
      onError
    );

    const button = getByTestId("catches");
    button.click();

    await waitForElement(() => getByTestId("error"));
    expect(onError).toBeCalled();
    expect(() => getByTestId("ok")).toThrowError();
  });
});
