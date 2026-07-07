import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const menuItems = sqliteTable('menu_items', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  price: integer('price').notNull(),
  stockQuantity: integer('stock_quantity').notNull().default(0),
  inStock: integer('in_stock', { mode: 'boolean' }).notNull().default(true),
  image: text('image').notNull(),
  description: text('description').notNull(),
});

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  customerName: text('customer_name').notNull(),
  phone: text('phone').notNull(),
  items: text('items').notNull(),
  total: integer('total').notNull(),
  status: text('status').notNull(), // 'Pending' | 'WhatsApp Redirected' | 'Completed' | 'Cancelled'
  date: text('date').notNull(),
});

export const settings = sqliteTable('settings', {
  id: integer('id').primaryKey(),
  systemPrompt: text('system_prompt').notNull(),
  isFailoverActive: integer('is_failover_active', { mode: 'boolean' }).notNull().default(false),
});
