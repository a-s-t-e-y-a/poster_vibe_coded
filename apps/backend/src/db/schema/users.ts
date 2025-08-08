import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { timestamps } from "./base";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  avatar: text("avatar"),
  ...timestamps
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;