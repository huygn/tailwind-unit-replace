import resolveConfig from "tailwindcss/lib/util/resolveConfig";
import getAllConfigs from "tailwindcss/lib/util/getAllConfigs";
import type { TailwindConfig } from "tailwindcss/tailwind-config";

export * from "./utils";
export * from "./rem-unit-regex";

// recursively walks object/array to find a string value,
// then apply `replacer` to it
function processTheme(
  theme: Record<string, {} | string>,
  {
    exclude = [],
    replacer = (v) => v,
  }: Omit<Options, "exclude"> & { exclude?: string[] } = {}
) {
  // might need to deep clone, but seems unecessary
  let replacedTheme = theme;

  // also work for array
  for (const [key, value] of Object.entries(replacedTheme)) {
    if (exclude.includes(key)) continue;

    let val = value;
    switch (typeof value) {
      case "object":
        val = processTheme(value);
        break;
      case "string":
        val = replacer(value);
        break;
    }
    replacedTheme[key] = val;
  }

  return replacedTheme;
}

export const replaceTailwindUnit = (opts: Options) => (
  userConfig: TailwindConfig
): TailwindConfig => {
  let { theme, ...config } = resolveConfig([...getAllConfigs(userConfig)]);
  return {
    ...config,
    theme: processTheme(theme, opts),
  };
};
