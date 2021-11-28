import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
    mutation login($account:String! $password:String!){
        login(account: $account password:$password){
            ok
            error
            token
        }
    }
`;

export const NEWACCOUNT_MUTATION = gql`
    mutation newAccount($username:String! $account:String! $password:String!){
        newAccount(username:$username account: $account password:$password){
            ok
            error
        }
    }
`;

export const GETACCOUNT_QUERY = gql`
    query getAccount{
        getAccount
    }
`;

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
            }
        }
    }
`;

export const DOLIKE_MUTATION = gql`
    mutation doLike($id: Int!){
        doLike(id:$id){
            ok
            error
        }
    }
`;

export const DOUNLIKE_MUTATION = gql`
mutation doUnLike($id: Int!){
    doUnLike(id:$id){
        ok
        error
    }
}
`;
