import { db } from './index';
import { menuItems, orders, settings } from './schema';
import { mockDb } from '../lib/mockDb';

async function seed() {
  console.log('Seeding database...');
  
  // Clean existing tables (not strictly necessary for a fresh DB, but good practice)
  await db.delete(menuItems);
  await db.delete(orders);
  await db.delete(settings);

  // Insert mock data
  console.log('Inserting menu items...');
  for (const item of mockDb.menuItems) {
    await db.insert(menuItems).values(item);
  }

  console.log('Inserting orders...');
  for (const order of mockDb.orders) {
    await db.insert(orders).values(order);
  }

  console.log('Inserting settings...');
  await db.insert(settings).values([
    {
      id: 1,
      systemPrompt: "You are the AI assistant for Dapoer Navita, an Indonesian F&B business. You must be polite, helpful, and speak in Indonesian. You help customers with the menu.",
      isFailoverActive: false,
      isStoreOpen: true,
      openingTime: "09:00",
      closingTime: "21:00",
    }
  ]).onConflictDoNothing();

  console.log('Database seeded successfully!');
}

seed().catch((e) => {
  console.error('Seed error:', e);
  process.exit(1);
});
