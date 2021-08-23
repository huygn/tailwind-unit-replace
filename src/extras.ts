import { remUnitRegex } from "./rem-unit-regex";

export function toEM(value: string) {
  return value.replace(remUnitRegex, (match, remDigit) => {
    // replace REM-contained value
    const amount = Number(remDigit);
    if (Number.isNaN(amount)) {
      return match;
    }
    return `${amount}em`;
  });
}

export function toPX(value: string) {
  return value.replace(remUnitRegex, (match, remDigit) => {
    const amount = Number(remDigit);
    if (Number.isNaN(amount)) {
      return match;
    }
    return `${amount * 16}px`;
  });
}
