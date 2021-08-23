import { processTheme } from "./process-theme";
import { toEM } from "./extras";
import { test } from "uvu";
import * as assert from "uvu/assert";

test("should convert units from rem -> em", () => {
  const configs = [
    // same shape
    [
      {
        theme: { extend: { spacing: { "(screen-8)": "calc(100vh - 2rem)" } } },
      },
      { theme: { extend: { spacing: { "(screen-8)": "calc(100vh - 2em)" } } } },
    ],
    // only convert values
    [
      { rem: "1px", em: "calc(100vh - 2rem)" },
      { rem: "1px", em: "calc(100vh - 2em)" },
    ],
    // deeply nested
    [
      {
        fontSize: {
          xs: ["0.75rem", { lineHeight: "1rem" }],
          sm: ["0.875rem", { lineHeight: "1.25rem" }],
        },
      },
      {
        fontSize: {
          xs: ["0.75em", { lineHeight: "1em" }],
          sm: ["0.875em", { lineHeight: "1.25em" }],
        },
      },
    ],
    // array
    [
      {
        outline: {
          none: ["2px solid transparent", "2px"],
          white: ["2rem dotted white", "2rem"],
          black: ["2rem dotted black", "2rem"],
        },
      },
      {
        outline: {
          none: ["2px solid transparent", "2px"],
          white: ["2em dotted white", "2em"],
          black: ["2em dotted black", "2em"],
        },
      },
    ],
  ];

  for (const [input, output] of configs) {
    assert.equal(processTheme(input, { exclude: [], replacer: toEM }), output);
  }
});

test("should ignore provided `exclude` key", () => {
  const configs = [
    {
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
      },
      spacing: { "(screen-8)": "calc(100vh - 2rem)" },
    },
    {
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
      },
      spacing: { "(screen-8)": "calc(100vh - 2em)" },
    },
  ];
  const [input, output] = configs;
  assert.equal(
    processTheme(input, { exclude: ["fontSize"], replacer: toEM }),
    output
  );
});

test.run();
