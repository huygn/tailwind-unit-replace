// https://github.com/tailwindlabs/tailwindcss/blob/master/src/util/resolveConfig.js#L259
declare module "tailwindcss/lib/util/resolveConfig" {
  import { TailwindConfig } from "tailwindcss/tailwind-config";
  export default function (configs: TailwindConfig[]): TailwindConfig;
}

// https://github.com/tailwindlabs/tailwindcss/blob/master/src/util/getAllConfigs.js
declare module "tailwindcss/lib/util/getAllConfigs" {
  import { TailwindConfig } from "tailwindcss/tailwind-config";
  export default function (config: TailwindConfig): TailwindConfig[];
}
