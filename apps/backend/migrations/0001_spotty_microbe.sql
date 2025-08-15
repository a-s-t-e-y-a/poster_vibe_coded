PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`stack_auth_id` text NOT NULL,
	`primary_email` text NOT NULL,
	`primary_email_verified` integer DEFAULT false NOT NULL,
	`primary_email_auth_enabled` integer DEFAULT false NOT NULL,
	`signed_up_at_millis` integer NOT NULL,
	`last_active_at_millis` integer NOT NULL,
	`is_anonymous` integer DEFAULT false NOT NULL,
	`display_name` text NOT NULL,
	`profile_image_url` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "stack_auth_id", "primary_email", "primary_email_verified", "primary_email_auth_enabled", "signed_up_at_millis", "last_active_at_millis", "is_anonymous", "display_name", "profile_image_url", "created_at", "updated_at") SELECT "id", "stack_auth_id", "primary_email", "primary_email_verified", "primary_email_auth_enabled", "signed_up_at_millis", "last_active_at_millis", "is_anonymous", "display_name", "profile_image_url", "created_at", "updated_at" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;