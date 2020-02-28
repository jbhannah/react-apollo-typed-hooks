import { OperationVariables as _OperationVariables } from "@apollo/react-common";
import { DocumentNode } from "graphql";

export abstract class Operation<D = unknown, V = _OperationVariables> {
  protected data: D;
  protected variables: V;

  constructor(public statement: DocumentNode) {}
}

export type OperationData<
  T extends Operation<unknown, unknown>
> = T extends Operation<infer D, unknown> ? D : never;

export type OperationVariables<
  T extends Operation<unknown, unknown>
> = T extends Operation<unknown, infer V> ? V : never;
