import { component$, Slot } from "@builder.io/qwik";
import { type RequestHandler, routeLoader$ } from "@builder.io/qwik-city";
import { type User, verifyRequestOrigin } from "lucia";
import { Sidebar } from "~/components/layout/sidebar";
import { lucia } from "~/utils/lucia";

export const onRequest: RequestHandler = async ({
  cookie,
  headers,
  method,
  sharedMap,
  status,
  url,
}) => {
  if (method.toUpperCase() !== "GET") {
    const origin = headers.get("Origin");
    const host = headers.get("Host");

    if (!origin || !host || !verifyRequestOrigin(origin, [host])) {
      status(403);
      return;
    }
  }

  if (
    !url.pathname.startsWith("/_frsh/") &&
    !url.pathname.startsWith("/assets/")
  ) {
    const sessionId = cookie.get(lucia.sessionCookieName)?.value;

    if (!sessionId) {
      sharedMap.set("user", null);
      return;
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookie.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    if (session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookie.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }

    sharedMap.set("user", user);
    sharedMap.set("session", session);
  }
};

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export const useSessionUser = routeLoader$(({ sharedMap }) => {
  return (sharedMap.get("user") ?? null) as User | null;
});

export default component$(() => {
  return (
    <div class="grid grid-cols-[16rem_1fr] w-screen">
      <Sidebar />
      <main>
        <Slot />
      </main>
    </div>
  );
});
