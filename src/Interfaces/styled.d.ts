import 'styled-components';

declare module "styled-components" {
    export interface DefaultTheme {
        primary: string;
        background: string;
        bar: string;
        border: string;
        text: string;
        subtext: string;
        notification: string;
    }
}
