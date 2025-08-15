CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`stack_auth_id` text NOT NULL,
	`primary_email` text NOT NULL,
	`primary_email_verified` boolean DEFAULT false NOT NULL,
	`primary_email_auth_enabled` boolean DEFAULT false NOT NULL,
	`signed_up_at_millis` integer NOT NULL,
	`last_active_at_millis` integer NOT NULL,
	`is_anonymous` boolean DEFAULT false NOT NULL,
	`display_name` text NOT NULL,
	`profile_image_url` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
