import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor:string,
    textColor:string,
    accentColor:string,
    cardBgColor:string,
    tapBgColor:string,
  }
}