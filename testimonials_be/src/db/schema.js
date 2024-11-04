import { boolean, integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";


export const starsEnum = pgEnum('stars', ['-1', '1', '2', '3', '4', '5']);
export const monthEnum = pgEnum('month', ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);

export const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  picture: text("picture"),
  isActive: boolean("isActive").default(true),
  isDelete: boolean("isDelete").default(false)
});

export const spaces = pgTable("spaces", {
  id: serial("id").primaryKey().notNull(),
  userId: integer("userId").references(() => users.id).notNull(),
  sname: text("sname").notNull(),
  tname: text("tname").notNull(),
  tdescription: text("tdescription"),
  picture: text("picture").notNull(),
  isStarRating: boolean("isStarRating").default(false).notNull(),
  que1: text("que1").notNull(),
  que2: text("que2").notNull(),
  que3: text("que3").notNull(),
  isActive: boolean("isActive").default(true),
})

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey().notNull(),
  spaceId: integer("spaceId").references(() => spaces.id).notNull(),
  tdesc: text("tdesc").notNull(),
  isLiked: boolean("isLiked").default(false).notNull(),
  stars: starsEnum("stars").notNull(),
  submittedBy: text("submittedBy").notNull(),
  submittedByEmail: text("submittedByEmail").notNull(),
  submittedOn: timestamp("submittedOn", { mode: "date", withTimezone: true, precision: 3 }).notNull().defaultNow(),
  // submittedOn2: timestamp("submittedOn2", { mode: "string", withTimezone: true, precision: 3 }).notNull().defaultNow(),
  isActive: boolean("isActive").default(true),
})

export const xTestimonials = pgTable("xTestimonials", {
  id: serial("id").primaryKey().notNull(),
  spaceId: integer("spaceId").references(() => spaces.id).notNull(),
  xId: text("xId").notNull(),
  isLiked: boolean("isLiked").default(false).notNull(),
  isActive: boolean("isActive").default(true),
})
// , withTimezone: true, precision: 3

export const spaceView = pgTable("spaceView", {
  id: serial("id").primaryKey().notNull(),
  spaceId: integer("spaceId").references(() => spaces.id).notNull(),
  year: integer("year").notNull(),
  month: monthEnum("month").notNull(),
  views: integer("views").notNull().default(0),
  isActive: boolean("isActive").default(true),
})