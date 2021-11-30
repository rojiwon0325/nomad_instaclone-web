/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFeed
// ====================================================

export interface seeFeed_seeFeed__count {
  __typename: "Post_count";
  like: number;
  comment: number;
  reComment: number;
}

export interface seeFeed_seeFeed_detail_comments__count {
  __typename: "Comment_count";
  reComment: number;
}

export interface seeFeed_seeFeed_detail_comments {
  __typename: "Comment";
  id: number;
  text: string[];
  rootId: string | null;
  account: string;
  createdAt: string;
  _count: seeFeed_seeFeed_detail_comments__count | null;
  isMine: boolean;
}

export interface seeFeed_seeFeed_detail {
  __typename: "Post_detail";
  isMine: boolean;
  caption: string[];
  account: string;
  isLiked: boolean;
  createdAt: string;
  avatarUrl: string;
  comments: seeFeed_seeFeed_detail_comments[];
}

export interface seeFeed_seeFeed {
  __typename: "Post";
  id: number;
  photo: string[];
  _count: seeFeed_seeFeed__count | null;
  detail: seeFeed_seeFeed_detail | null;
}

export interface seeFeed {
  seeFeed: seeFeed_seeFeed[] | null;
}

export interface seeFeedVariables {
  account: string;
  offset?: number | null;
}
