/**
 * saas-starter-template - Drizzle ORM setup with LibSQL/Turso
 * Database schema and client configuration
 */
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// ── Database Client ────────────────────────────────────────────────────────────

const libsqlClient = createClient({
  url: process.env.DATABASE_URL ?? "file:local.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(libsqlClient);
export type DB = typeof db;

// ── Schema ─────────────────────────────────────────────────────────────────────

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const subscriptions = sqliteTable("subscriptions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  plan: text("plan", { enum: ["free", "pro", "enterprise"] })
    .notNull()
    .default("free"),
  status: text("status", {
    enum: ["active", "canceled", "past_due", "trialing"],
  })
    .notNull()
    .default("active"),
  currentPeriodEnd: integer("current_period_end", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Subscription = typeof subscriptions.$inferSelect;
