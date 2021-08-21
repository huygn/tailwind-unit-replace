import type { TailwindConfig } from "tailwindcss/tailwind-config";

export type Options = {
  exclude?: (keyof TailwindConfig["theme"])[];
  replacer: (v: string) => string;
};
