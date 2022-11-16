import { Options, } from "$fresh/plugins/twind.ts";
import { ThemeConfiguration } from "twind";
import themeColors from "./theme.colors.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      colors: themeColors
    },
  } as ThemeConfiguration
} as Options;

