/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seePost
// ====================================================

export interface seePost_seePost__count {
  __typename: "Post_count";
  like: number;
  comment: number;
  reComment: number;
}

export interface seePost_seePost_detail {
  __typename: "Post_detail";
  isMine: boolean;
  caption: string;
  account: string;
  isLiked: boolean;
  createdAt: string;
}

export interface seePost_seePost {
  __typename: "Post";
  id: number;
  photo: string[];
  _count: seePost_seePost__count | null;
  detail: seePost_seePost_detail | null;
}

export interface seePost {
  seePost: seePost_seePost[] | null;
}

export interface seePostVariables {
  id?: number | null;
  offset?: number | null;
}
