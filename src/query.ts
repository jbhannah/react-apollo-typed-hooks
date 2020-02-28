import { QueryResult } from "@apollo/react-common";
import { QueryHookOptions, useQuery as _useQuery } from "@apollo/react-hooks";
import { Operation, OperationData, OperationVariables } from "./operation";

export abstract class Query<D, V> extends Operation<D, V> {}

export const useQuery = <T extends Query<unknown, unknown>>(
  query: T,
  options: QueryHookOptions<OperationData<T>, OperationVariables<T>> = null
): QueryResult<OperationData<T>, OperationVariables<T>> =>
  _useQuery(query.statement, options);
