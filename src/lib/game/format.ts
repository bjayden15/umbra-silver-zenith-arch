export function money(n: number) {
  const sign = n < 0 ? "-" : "";
  const v = Math.abs(Math.round(n));
  if (v >= 1_000_000_000) return `${sign}$${(v / 1_000_000_000).toFixed(2)}B`;
  if (v >= 1_000_000) return `${sign}$${(v / 1_000_000).toFixed(2)}M`;
  return `${sign}$${v.toLocaleString("en-US")}`;
}

export function signedMoney(n: number) {
  const v = Math.round(n);
  if (v >= 0) return `+${money(v)}`;
  return money(v);
}

export function compact(n: number) {
  const v = Math.max(0, Math.round(n));
  if (v >= 1_000_000_000) return `${(v / 1_000_000_000).toFixed(1)}B`;
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 10_000) return `${(v / 1_000).toFixed(1)}K`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
  return v.toLocaleString("en-US");
}

export function weekParts(week: number) {
  const careerYear = Math.floor((week - 1) / 52) + 1;
  const year = 2025 + careerYear;
  const w = ((week - 1) % 52) + 1;
  const seasons = ["Winter", "Spring", "Summer", "Fall"] as const;
  const season = seasons[Math.floor(((w - 1) % 52) / 13)] ?? "Winter";
  return { careerYear, year, weekOfYear: w, season };
}

export function weekLabel(week: number) {
  const p = weekParts(week);
  return `Year ${p.careerYear} · Week ${p.weekOfYear} · ${p.season} ${p.year}`;
}

export function pct(n: number, digits = 0) {
  return `${(n * 100).toFixed(digits)}%`;
}

export function chartPlace(n: number | null) {
  if (n == null) return "—";
  return `#${n}`;
}

export function handleize(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 16);
}

export function weekStreams(s: { streamsWeek: number; streamsPending?: number }) {
  return s.streamsWeek + (s.streamsPending ?? 0);
}
