/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BSName
// ====================================================

export interface BSName__count {
  __typename: "Comment_count";
  reComment: number;
}

export interface BSName {
  __typename: "Comment";
  id: number;
  text: string[];
  rootId: string | null;
  account: string;
  createdAt: string;
  _count: BSName__count | null;
  isMine: boolean;
}
