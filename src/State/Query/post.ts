import { gql } from "@apollo/client";

export const SEEPOST_QUERY = gql`
query seePost($id:Int $offset:Int){
    seePost(id:$id offset:$offset) {
        id
        photo
        _count{
            like
            comment
            reComment
        }
        detail{
            isMine
            caption
            account
            isLiked
            createdAt
            comments{
                id
                text
                rootId
                account
                createdAt
                _count{
                    reComment
                }
                isMine
            }
        }
    }
}
`;

export const DOLIKE_MUTATION = gql`
mutation doLike($id: Int!){
    doLike(id:$id){
        ok
        error
        type
    }
}
`;

export const DOUNLIKE_MUTATION = gql`
mutation doUnLike($id: Int!){
doUnLike(id:$id){
    ok
    error
    type
}
}
`;

export const SEECOMMENT_QUERY = gql`
    query seeComment($postId:Int! $rootId:Int $offset:Int, $take:Int){
        seeComment(postId:$postId rootId:$rootId offset:$offset take:$take){
            id
            text
            rootId
            account
            createdAt
            _count{
                reComment
            }
            isMine
        }
    }
`;

export const DELETECOMMENT_MUTATION = gql`
    mutation deleteComment($id: Int!){
        deleteComment(id:$id){
            ok,
            error
        }
    }
`;

export const NEWCOMMENT_MUTATION = gql`
    mutation newComment($postId:Int! $text:String! $rootId:Int){
        newComment(postId:$postId text:$text rootId:$rootId){
            ok
            error
            comment{
                id
                text
                rootId
                account
                createdAt
                _count{
                    reComment
                }
                isMine
            }
        }
    }
`;