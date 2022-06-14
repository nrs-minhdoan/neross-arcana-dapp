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

export function formatSizeFileFromByte(size: number) {
  let unit = "B";
  let value = new BigNumber(size);
  if (value.isGreaterThanOrEqualTo(1024)) {
    unit = "KB";
    value = value.dividedBy(1024);
  }
  if (value.isGreaterThanOrEqualTo(1024)) {
    unit = "MB";
    value = value.dividedBy(1024);
  }
  if (value.isGreaterThanOrEqualTo(1024)) {
    unit = "GB";
    value = value.dividedBy(1024);
  }
  if (value.isGreaterThanOrEqualTo(1024)) {
    unit = "TB";
    value = value.dividedBy(1024);
  }
  return value.toFormat(2, {
    decimalSeparator: ".",
    groupSeparator: ",",
    groupSize: 3,
    suffix: ` ${unit}`,
  });
}

export function calculatePercent(value: number, limit?: number) {
  if (!limit) {
    return 0;
  } else if (value > limit) {
    return 100;
  } else {
    const result = new BigNumber(value)
      .dividedBy(limit)
      .multipliedBy(100)
      .toFixed(2);
    return Number(result);
  }
}

export function validateEmail(email: string) {
  return !!String(email)
    .trim()
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
