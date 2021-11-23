import 'styled-components';

declare module "styled-components" {
    export interface DefaultTheme {
        background: string;
        bar: string;
        text: string;
        subtext: string;
    }
}
