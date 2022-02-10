import BigNumber from "bignumber.js";

export function formatShortId(
  value: string,
  config?: { start: number; end: number; empty: string }
) {
  if (!value) {
    return config?.empty || "";
  }
  const start = value.slice(0, 0 + (config?.start || 16));
  const end = value.slice(value.length - 1 - (config?.end || 16), value.length);
  return `${start}...${end}`;
}

export function formatSizeInKB(sizeInByte: number) {
  return Number(new BigNumber(sizeInByte).dividedBy(1024).toFixed(2));
}

export function validateEmail(email: string) {
  return !!String(email)
    .trim()
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
