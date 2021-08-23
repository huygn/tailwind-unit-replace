import resolveConfig from "tailwindcss/lib/util/resolveConfig";
import getAllConfigs from "tailwindcss/lib/util/getAllConfigs";
import type { TailwindConfig } from "tailwindcss/tailwind-config";
import { processTheme } from "./process-theme";

export * from "./extras";
export * from "./rem-unit-regex";
export * from "./process-theme";

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

  // mimics the way Tailwind resolves user's config
  // https://github.com/tailwindlabs/tailwindcss/blob/master/src/util/resolveConfig.js#L259
  // https://github.com/tailwindlabs/tailwindcss/blob/master/src/util/getAllConfigs.js
  const { theme, ...config } = resolveConfig([...getAllConfigs(userConfig)]);

  return {
    ...config,
    theme: processTheme(theme, mergedOpts),
  };
};
