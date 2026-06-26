// Server-only: admin session config + helpers. Never import from client/route files at module scope.
import { useSession } from "@tanstack/react-start/server";
import { scryptSync, timingSafeEqual } from "node:crypto";

export type AdminSession = { isAdmin?: boolean; loginAt?: number };

export function getAdminSessionConfig() {
  const password = process.env.ADMIN_SESSION_SECRET;
  if (!password) throw new Error("ADMIN_SESSION_SECRET is not set");
  return {
    password,
    name: "rg-admin-session",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none" as const,
      partitioned: true,
      path: "/",
    },
  };
}

export async function getAdminSession() {
  return useSession<AdminSession>(getAdminSessionConfig());
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME;
  const stored = process.env.ADMIN_PASSWORD_HASH;
  if (!expectedUser || !stored) return false;

  // Timing-safe username compare (pad/truncate to fixed length via hashing both to scrypt over same salt)
  // Simpler: compare via Buffer length-safe compare on equal-length sha-like derivations.
  const userOk = (() => {
    const a = Buffer.from(username);
    const b = Buffer.from(expectedUser);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  })();

  const [salt, hashHex] = stored.split(":");
  if (!salt || !hashHex) return false;
  const expected = Buffer.from(hashHex, "hex");
  const derived = scryptSync(password, salt, expected.length);
  const passOk = expected.length === derived.length && timingSafeEqual(expected, derived);

  return userOk && passOk;
}
