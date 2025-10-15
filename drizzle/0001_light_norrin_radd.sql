DROP TABLE `subscriptions`;--> statement-breakpoint
DROP INDEX IF EXISTS `users_stripe_customer_id_unique`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `stripe_customer_id`;