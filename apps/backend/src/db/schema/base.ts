
import { text , integer} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const timestamps = {
    id: integer("id").primaryKey({ autoIncrement: true }),
    createdAt: text("created_at")
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at")
      .default(sql`CURRENT_TIMESTAMP`),
}