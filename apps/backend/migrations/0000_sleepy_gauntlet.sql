CREATE TABLE `users` (
	`email` text NOT NULL,
	`username` text NOT NULL,
	`name` text NOT NULL,
	`avatar` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);