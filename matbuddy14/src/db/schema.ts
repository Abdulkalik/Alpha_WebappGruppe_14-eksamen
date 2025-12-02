import { sqliteTable, integer, text, uniqueIndex } from "drizzle-orm/sqlite-core";

// b table
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", { length: 255 }).notNull(),
  email: text("email", { length: 255 }).notNull().unique(),
});

// Recipes tabell
export const recipes = sqliteTable("recipes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  ingredients: text("ingredients").notNull(),
  createdBy: integer("created_by")
    .notNull()
    .references(() => users.id),
});


export const favorites = sqliteTable(
  "favorites",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    recipeId: integer("recipe_id")
      .notNull()
      .references(() => recipes.id),
  },
  (table) => ({
    userRecipeUnique: uniqueIndex("favorite_user_recipe_unique").on(
      table.userId,
      table.recipeId
    ),
  })
);
