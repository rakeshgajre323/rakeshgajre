import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const LoginInput = z.object({
  username: z.string().min(1).max(100),
  password: z.string().min(1).max(200),
});

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => LoginInput.parse(data))
  .handler(async ({ data }) => {
    const { verifyAdminCredentials, getAdminSession } = await import("./admin-session.server");
    // Tiny timing equalizer to slow brute force attempts.
    await new Promise((r) => setTimeout(r, 350));
    const ok = verifyAdminCredentials(data.username, data.password);
    if (!ok) return { ok: false as const };
    const session = await getAdminSession();
    await session.update({ isAdmin: true, loginAt: Date.now() });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const { getAdminSession } = await import("./admin-session.server");
  const session = await getAdminSession();
  await session.clear();
  return { ok: true as const };
});

export const adminCheck = createServerFn({ method: "GET" }).handler(async () => {
  const { getAdminSession } = await import("./admin-session.server");
  const session = await getAdminSession();
  return { isAdmin: !!session.data.isAdmin };
});
