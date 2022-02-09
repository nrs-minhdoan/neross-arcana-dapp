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

export function formatKBSize(byteSize: number) {
  return Number(new BigNumber(byteSize).dividedBy(1024).toFixed(2));
}
