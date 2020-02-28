import { MutationFunction as _MutationFunction } from "@apollo/react-common";
import {
  MutationHookOptions,
  MutationTuple,
  useMutation as _useMutation
} from "@apollo/react-hooks";
import { Operation, OperationData, OperationVariables } from "./operation";

export abstract class Mutation<D, V> extends Operation<D, V> {}

export type MutationFunction<
  T extends Mutation<unknown, unknown>
> = _MutationFunction<OperationData<T>, OperationVariables<T>>;

export const useMutation = <T extends Mutation<unknown, unknown>>(
  mutation: T,
  options: MutationHookOptions<OperationData<T>, OperationVariables<T>> = null
): MutationTuple<OperationData<T>, OperationVariables<T>> =>
  _useMutation(mutation.statement, { onError: () => null, ...options });
