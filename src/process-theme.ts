// recursively walks object/array to find a string value,
// then apply `replacer` to it
export function processTheme(
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
