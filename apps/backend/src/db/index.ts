import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import type { D1Database } from '@cloudflare/workers-types';

interface Env {
  DB: D1Database;
}

export const createDb = (env: Env) => {
  return drizzle(env.DB, { schema });
};

export type Database = ReturnType<typeof createDb>;
export { schema };
