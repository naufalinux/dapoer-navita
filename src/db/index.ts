import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import path from 'path';

// Note: For Next.js App Router, ensure to keep a single DB instance in dev mode
const sqlite = new Database(path.join(process.cwd(), 'sqlite.db'));
export const db = drizzle(sqlite, { schema });
