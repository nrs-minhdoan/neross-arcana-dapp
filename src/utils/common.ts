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
