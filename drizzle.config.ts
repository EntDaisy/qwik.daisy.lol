import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/utils/schema.ts",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url: process.env.PRIVATE_TURSO_DB_URL!,
    authToken: process.env.PRIVATE_TURSO_DB_AUTH_TOKEN!,
  },
} satisfies Config;
