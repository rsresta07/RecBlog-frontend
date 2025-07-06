import { createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  /** 1)  Custom color palettes  */
  colors: {
    // background palette for buttons etc.
    "primary-btn": [
      "#f5e8ff",
      "#e7d4ff",
      "#d1aaff",
      "#bb7fff",
      "#a455ff",
      "#7e22ce", // <‑‑ shade[5] is what Mantine uses for filled buttons
      "#6917a8",
      "#541082",
      "#3e0a5c",
      "#280436",
    ],

    // text color palette – rarely needed unless you’ll use it elsewhere
    "btn-text": [
      "#ffffff",
      "#f7f7f7",
      "#efefef",
      "#e6e6e6",
      "#d4d4d4",
      "#c1c1c1",
      "#9e9e9e",
      "#7c7c7c",
      "#595959",
      "#1f1f1f",
    ],
  },

  /** 2)  Point Mantine’s “primary” at your palette  */
  primaryColor: "primary-btn",

  /** 3)  Optional: tweak default radius, font, breakpoints, etc. */
  fontFamily: "Inter, sans-serif",
  defaultRadius: "md",
  spacing: { xs: rem(8), sm: rem(12), md: rem(16) },
});
