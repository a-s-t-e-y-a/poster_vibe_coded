
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { timestamps } from "./base";
import { createInsertSchema } from "drizzle-zod";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  stack_auth_id: text("stack_auth_id").notNull(),
  primary_email: text('primary_email').notNull(),
  primary_email_verified: integer('primary_email_verified', {
    mode: 'boolean'
  }).notNull().default(false),
  primary_email_auth_enabled: integer('primary_email_auth_enabled', {
    mode: 'boolean'
  }).notNull().default(false),
  signed_up_at_millis: integer('signed_up_at_millis').notNull(),
  last_active_at_millis: integer('last_active_at_millis').notNull(),
  is_anonymous: integer('is_anonymous', {
    mode: 'boolean'
  }).notNull().default(false),
  display_name: text('display_name').notNull(),
  profile_image_url: text('profile_image_url'),
  ...timestamps
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export const userInsertSchema = createInsertSchema(users);