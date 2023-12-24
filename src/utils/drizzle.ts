import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const libsql = createClient({
  url: process.env.PRIVATE_TURSO_DB_URL!,
  authToken: process.env.PRIVATE_TURSO_DB_AUTH_TOKEN!,
});

export const db = drizzle(libsql, { schema });
