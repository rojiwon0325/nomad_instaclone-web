import { getMe } from "Interfaces/Igql/getMe";
import { atom, selector } from "recoil";
import { client } from "./apollo";
import { getCookie } from "./cookie";
import { GETME_QUERY } from "./Query/account";

export const isDarkMode = atom<boolean>({
    key: "IsDarkMode",
    default: selector({
        key: "IsDarkMode/Default",
        get: () => window.matchMedia('(prefers-color-scheme: dark)').matches
    })
});

export const MyAccount = atom<string | null>({
    key: "MyAccount",
    default: null,
});

export const getMyAccount = selector({
    key: "MyAccount/Get",
    get: async ({ get }) => {
        const token = getCookie('jwt');
        const account = get(MyAccount);
        if (token && account) {
            return account;
        } else if (!token) {
            return null;
        }
        const { data: { getMe } } = await client.query<getMe>({ query: GETME_QUERY });
        return getMe?.account ?? null;
    },
});