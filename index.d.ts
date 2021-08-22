import type { TailwindConfig } from "tailwindcss/tailwind-config";

export type Options = {
  exclude?: (keyof TailwindConfig["theme"])[];
  replacer: (v: string) => string;
};

export function replaceTalwindUnit(
  opts: Options
): (cfg: TailwindConfig) => TailwindConfig;

export function toREM(value: string): string;
