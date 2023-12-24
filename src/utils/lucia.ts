import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import { db } from "./drizzle";
import { sessionTable, userTable } from "./schema";

// @ts-expect-error
const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes(attributes) {
    return {
      id: attributes.id,
      username: attributes.username,
      profileImage: attributes.profileImage,
      createdAt: attributes.createdAt,
      entryId: attributes.entryId,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
  interface DatabaseUserAttributes {
    id: string;
    username: string;
    profileImage: string | null;
    createdAt: number;
    entryId: string;
  }
}
