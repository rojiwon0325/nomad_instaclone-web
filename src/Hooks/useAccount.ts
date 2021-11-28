import { useQuery } from "@apollo/client";
import { getAccount } from "Interfaces/Igql/getAccount";
import { getCookie } from "State/cookie";
import { GETACCOUNT_QUERY } from "State/query";


const useAccount = (): boolean | string => {
    const token = getCookie('jwt');
    const { data, error } = useQuery<getAccount>(GETACCOUNT_QUERY, {
        skip: !token
    });
    if (error) {
        return false;
    } else if (data === undefined) {
        if (typeof token === 'string') {
            return token;
        } else {
            return false;
        }
    } else {
        return data.getAccount;
    }
};

export default useAccount;