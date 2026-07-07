CREATE TABLE `menu_items` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`price` integer NOT NULL,
	`stock_quantity` integer DEFAULT 0 NOT NULL,
	`in_stock` integer DEFAULT true NOT NULL,
	`image` text NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`customer_name` text NOT NULL,
	`phone` text NOT NULL,
	`items` text NOT NULL,
	`total` integer NOT NULL,
	`status` text NOT NULL,
	`date` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` integer PRIMARY KEY NOT NULL,
	`system_prompt` text NOT NULL,
	`is_failover_active` integer DEFAULT false NOT NULL,
	`is_store_open` integer DEFAULT true NOT NULL,
	`schedule` text DEFAULT '{"monday":{"isOpen":true,"open":"09:00","close":"21:00"},"tuesday":{"isOpen":true,"open":"09:00","close":"21:00"},"wednesday":{"isOpen":true,"open":"09:00","close":"21:00"},"thursday":{"isOpen":true,"open":"09:00","close":"21:00"},"friday":{"isOpen":true,"open":"09:00","close":"21:00"},"saturday":{"isOpen":true,"open":"09:00","close":"21:00"},"sunday":{"isOpen":false,"open":"09:00","close":"21:00"}}' NOT NULL
);
