import { atom, selector } from "recoil";

export const isDarkMode = atom<boolean>({
    key: "IsDarkMode",
    default: selector({
        key: "IsDarkMode/Default",
        get: () => window.matchMedia('(prefers-color-scheme: dark)').matches
    })
});
