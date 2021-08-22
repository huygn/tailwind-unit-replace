import type { TailwindConfig } from "tailwindcss/tailwind-config";

export type Options = {
  exclude?: (keyof TailwindConfig["theme"])[];
  replacer: (v: string) => string;
};

export function replaceTailwindUnit(
  opts: Options
): (cfg: TailwindConfig) => TailwindConfig;

export function toEM(value: string): string;
