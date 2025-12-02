import { render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/Home";
import { Login } from "@/app/pages/LoginPage";

import { db, users, recipes, favorites } from "@/db";
import { eq, and, desc } from "drizzle-orm";

function json(data: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data), {
    status: init.status ?? 200,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}

export type AppContext = {}; 


export default defineApp([
  setCommonHeaders(),

  ({ ctx }) => {
    void ctx;
  },

  route("/api/health", () => json({ ok: true })),

  route("/api/login", {
    async post({ request }) {
      try {
        const body = await request.json().catch(() => null);

        if (!body || typeof body !== "object") {
          return json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const { name, email } = body as { name?: string; email?: string };

        if (!email || typeof email !== "string") {
          return json({ error: "Email required" }, { status: 400 });
        }

        let rows = await db.select().from(users).where(eq(users.email, email));
        let user = rows[0];

        if (!user) {
          await db.insert(users).values({ name: name || "User", email });
          rows = await db.select().from(users).where(eq(users.email, email));
          user = rows[0];
        }

        return json(user);
      } catch (err) {
        console.error("Login error:", err);
        return json({ error: "Login failed" }, { status: 500 });
      }
    },
  }),

  route("/api/recipes", {
    async get() {
      try {
        const all = await db.select().from(recipes);
        return json(all);
      } catch (err) {
        console.error("Load recipes error:", err);
        return json({ error: "Failed to load recipes" }, { status: 500 });
      }
    },

    async post({ request }) {
      try {
        const body = await request.json().catch(() => null);

        if (!body || typeof body !== "object") {
          return json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const {
          title,
          description,
          ingredients,
          imageUrl,
          createdBy,
        } = body as {
          title?: string;
          description?: string;
          ingredients?: string;
          imageUrl?: string | null;
          createdBy?: number | string;
        };

        if (!title || !ingredients || createdBy == null) {
          return json({ error: "Missing fields" }, { status: 400 });
        }

        await db.insert(recipes).values({
          title,
          description: description ?? "",
          ingredients,
          imageUrl: imageUrl ?? null,
          createdBy: Number(createdBy),
        });

        const [recipe] = await db
          .select()
          .from(recipes)
          .orderBy(desc(recipes.id))
          .limit(1);

        return json(recipe, { status: 201 });
      } catch (err) {
        console.error("Create recipe error:", err);
        return json({ error: "Failed to create recipe" }, { status: 500 });
      }
    },
  }),

  route("/api/favorites", {
    async get({ request }) {
      try {
        const url = new URL(request.url);
        const userId = Number(url.searchParams.get("userId"));

        if (!userId) {
          return json({ error: "userId required" }, { status: 400 });
        }

        const rows = await db
          .select()
          .from(favorites)
          .where(eq(favorites.userId, userId));

        return json(rows);
      } catch (err) {
        console.error("Load favorites error:", err);
        return json({ error: "Failed to load favorites" }, { status: 500 });
      }
    },

    async post({ request }) {
      try {
        const body = await request.json().catch(() => null);

        if (!body || typeof body !== "object") {
          return json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const { userId, recipeId } = body as {
          userId?: number | string;
          recipeId?: number | string;
        };

        if (!userId || !recipeId) {
          return json(
            { error: "Missing userId or recipeId" },
            { status: 400 }
          );
        }

        await db.insert(favorites).values({
          userId: Number(userId),
          recipeId: Number(recipeId),
        });

        return json({ ok: true }, { status: 201 });
      } catch (err) {
        console.error("Add favorite error:", err);
        return json({ error: "Failed to add favorite" }, { status: 500 });
      }
    },

    async delete({ request }) {
      try {
        const body = await request.json().catch(() => null);

        if (!body || typeof body !== "object") {
          return json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const { userId, recipeId } = body as {
          userId?: number | string;
          recipeId?: number | string;
        };

        if (!userId || !recipeId) {
          return json(
            { error: "Missing userId or recipeId" },
            { status: 400 }
          );
        }

        await db
          .delete(favorites)
          .where(
            and(
              eq(favorites.userId, Number(userId)),
              eq(favorites.recipeId, Number(recipeId))
            )
          );

        return json({ ok: true });
      } catch (err) {
        console.error("fjerner favoritter error:", err);
        return json({ error: "deserve kunne ikke lagre til favouriter" }, { status: 500 });
      }
    },
  }),

  render(Document, [
    route("/", Login),
    route("/login", Login),
    route("/home", Home),
  ]),
]);
