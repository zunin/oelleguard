import catppuccinThemePalette,{Color} from "palette";

const variant: keyof typeof catppuccinThemePalette["variants"] = "mocha";

const palette = catppuccinThemePalette.variants[variant]
type PaletteKey = keyof typeof palette;

/** @type {Omit<import("$fresh/plugins/twind.ts").Options, "selfURL">} */
export default (Object.keys(palette) as Array<PaletteKey>)
.map(k => [k, palette[k].hex])
.reduce((res, [currKey, currVal]) => {
  return {
    ...res,
    [currKey]: currVal
  };
}, {} as Record<PaletteKey, Color["hex"]>);

