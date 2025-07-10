import { createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  /** 1)  Custom color palettes  */
  colors: {
    "primary-color": [
      "#e7ebf9", // 0
      "#c3d0f0", // 1
      "#9fb5e7", // 2
      "#7b99de", // 3
      "#577ed5", // 4
      "#273FA1", // 5 - your main brand color
      "#1f3381", // 6
      "#172761", // 7
      "#0f1a41", // 8
      "#070e21", // 9
    ],

    "secondary-color": [
      "#e7ebf9", // 0
      "#c3d0f0", // 1
      "#9fb5e7", // 2
      "#7b99de", // 3
      "#577ed5", // 4
      "#6B85ED", // 5 - your main brand color
      "#1f3381", // 6
      "#172761", // 7
      "#0f1a41", // 8
      "#070e21", // 9
    ],

    "custom-orange": [
      "#FFF5E6", // 0 - very light
      "#FFEBBF", // 1 - lighter
      "#FFD38A", // 2 - light
      "#FFB64C", // 3 - light-medium
      "#FFA030", // 4 - medium-light
      "#F28F3B", // 5 - main color (your orange)
      "#B26B21", // 6 - medium-dark
      "#7F4A12", // 7 - dark
      "#4B2B07", // 8 - darker
      "#1A0F00", // 9 - very dark
    ],
  },

  /** 2)  Point Mantine’s “primary” at your palette  */
  primaryColor: "primary-color",

  /** 3)  Optional: tweak default radius, font, breakpoints, etc. */
  fontFamily: "Inter, sans-serif",
  defaultRadius: "md",
  spacing: { xs: rem(8), sm: rem(12), md: rem(16) },
});
