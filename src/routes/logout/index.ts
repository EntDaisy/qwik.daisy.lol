import type { RequestHandler } from "@builder.io/qwik-city";
import type { Session } from "lucia";
import { lucia } from "~/utils/lucia";

export const onGet: RequestHandler = async ({
  cookie,
  redirect,
  sharedMap,
}) => {
  const session = sharedMap.get("session") as Session;
  if (session) {
    await lucia.invalidateSession(session.id);
    const blankSessionCookie = lucia.createBlankSessionCookie();
    cookie.set(
      blankSessionCookie.name,
      blankSessionCookie.value,
      blankSessionCookie.attributes,
    );
  }

  throw redirect(302, "/");
};
