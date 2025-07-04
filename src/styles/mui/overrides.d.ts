import type { Palette, PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom?: {
      secondary:string;
      bgTertiary: string;
      bgHover: string;
      borderLight: string;
      borderMedium: string;
      infoBg: string;
      warningBg: string;
      errorBg: string;
      ratingBg: string;
    };
    user?: {
      main: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      secondary:string;
      bgTertiary: string;
      bgHover: string;
      borderLight: string;
      borderMedium: string;
      infoBg: string;
      warningBg: string;
      errorBg: string;
      ratingBg: string;
    };
    user?: {
      main: string;
    };
  }
}
