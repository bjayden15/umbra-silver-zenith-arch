import { ACHIEVEMENTS } from "./world";
import type { Artist, GameState, Notif } from "./types";
import { clamp } from "./rng";

export function nid(state: GameState, p: string) {
  state.idSeq += 1;
  return `${p}_${state.idSeq.toString(36)}`;
}

export function playerArtist(state: GameState): Artist | null {
  if (!state.playerArtistId) return null;
  return state.artists.find((a) => a.id === state.playerArtistId) ?? null;
}

export function rosterOf(state: GameState) {
  if (state.career === "artist") {
    const a = playerArtist(state);
    return a ? [a] : [];
  }
  return state.artists.filter((a) => a.labelId === "player");
}

export function isControlled(state: GameState, artist: Artist) {
  if (state.career === "artist") return artist.id === state.playerArtistId;
  return artist.labelId === "player";
}

export function pushNotif(state: GameState, n: Omit<Notif, "id" | "week">) {
  state.notifs.unshift({ id: nid(state, "n"), week: state.week, ...n });
  state.notifs = state.notifs.slice(0, 48);
}

export function unlockAchievement(state: GameState, id: string) {
  if (state.achievements.some((a) => a.id === id)) return;
  if (!ACHIEVEMENTS.some((a) => a.id === id)) return;
  state.achievements.push({ id, week: state.week });
  const meta = ACHIEVEMENTS.find((a) => a.id === id);
  pushNotif(state, { tone: "good", title: `Achievement · ${meta?.name ?? id}`, body: meta?.hint ?? "" });
}

export function syncPopularity(artist: Artist) {
  const social = artist.followers.tiktok + artist.followers.instagram + artist.followers.x + artist.followers.youtube;
  artist.popularity = clamp(
    Math.round(
      artist.fame * 0.4 +
        Math.log10(1 + artist.monthlyListeners) * 7.2 +
        Math.log10(1 + social) * 4.4 +
        (artist.verified.spotify ? 3 : 0) +
        (artist.superstar ? 8 : 0),
    ),
    0,
    100,
  );
}
