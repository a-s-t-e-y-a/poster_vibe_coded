
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { timestamps } from "./base";
import { createInsertSchema } from "drizzle-zod";
import { boolean } from "drizzle-orm/gel-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  stack_auth_id: text("stack_auth_id").notNull(),
  primary_email: text('primary_email').notNull(),
  primary_email_verified: boolean('primary_email_verified').notNull().default(false),
  primary_email_auth_enabled: boolean('primary_email_auth_enabled').notNull().default(false),
  signed_up_at_millis: integer('signed_up_at_millis').notNull(),
  last_active_at_millis: integer('last_active_at_millis').notNull(),
  is_anonymous: boolean('is_anonymous').notNull().default(false),
  display_name: text('display_name').notNull(),
  profile_image_url: text('profile_image_url'),
  ...timestamps
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export const userInsertSchema = createInsertSchema(users);