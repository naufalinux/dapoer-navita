import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export type DaySchedule = {
  isOpen: boolean;
  open: string;
  close: string;
};

export type StoreSchedule = {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
};

const defaultSchedule: StoreSchedule = {
  monday: { isOpen: true, open: '09:00', close: '21:00' },
  tuesday: { isOpen: true, open: '09:00', close: '21:00' },
  wednesday: { isOpen: true, open: '09:00', close: '21:00' },
  thursday: { isOpen: true, open: '09:00', close: '21:00' },
  friday: { isOpen: true, open: '09:00', close: '21:00' },
  saturday: { isOpen: true, open: '09:00', close: '21:00' },
  sunday: { isOpen: false, open: '09:00', close: '21:00' },
};

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
  isStoreOpen: integer('is_store_open', { mode: 'boolean' }).notNull().default(true),
  schedule: text('schedule', { mode: 'json' }).$type<StoreSchedule>().notNull().default(defaultSchedule),
  temperature: real('temperature').notNull().default(0.2),
});
