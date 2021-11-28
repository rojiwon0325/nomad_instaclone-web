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