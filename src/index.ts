import resolveConfig from "tailwindcss/lib/util/resolveConfig";
import getAllConfigs from "tailwindcss/lib/util/getAllConfigs";
import type { TailwindConfig } from "tailwindcss/tailwind-config";

export * from "./extras";
export * from "./rem-unit-regex";

// recursively walks object/array to find a string value,
// then apply `replacer` to it
function processTheme(
  theme: Record<string, {} | string>,
  { exclude = [], replacer }: Omit<Options, "exclude"> & { exclude?: string[] }
) {
  // might need to deep clone, but seems unecessary
  let replacedTheme = theme;

  // also work for array
  for (const [key, value] of Object.entries(replacedTheme)) {
    if (exclude.includes(key)) continue;

    let val = value;
    switch (typeof value) {
      case "object":
        val = processTheme(value, { exclude, replacer });
        break;
      case "string":
        val = replacer(value);
        break;
    }
    replacedTheme[key] = val;
  }

  return replacedTheme;
}

const defaultOpts: Partial<Options> = {
  exclude: ["fontFamily"],
};

export const replaceTailwindUnit = (opts: Options) => (
  userConfig: TailwindConfig
): TailwindConfig => {
  if (!userConfig) {
    throw new Error("tailwindcss config is required");
  }

  const mergedOpts = { ...defaultOpts, ...opts };
  if (!mergedOpts.replacer || typeof mergedOpts.replacer !== "function") {
    throw new Error("replacer function is required");
  }

  // parse user's config the way Tailwind does
  const { theme, ...config } = resolveConfig([...getAllConfigs(userConfig)]);

  return {
    ...config,
    theme: processTheme(theme, mergedOpts),
  };
};
