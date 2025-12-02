"use client";

import { useEffect, useState } from "react";
import type { Meal } from "./Recipes";

const FAV_KEY = "matbuddy:favorites";

export function Favorites() {  
  const [favorites, setFavorites] = useState<Meal[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Meal[];
      setFavorites(parsed);
    } catch (err) {
      console.error("Kunne ikke desvere lese favoritter:", err);
    }
  }, []);

  const removeFavorite = (idMeal: string) => {
    const updated = favorites.filter((m) => m.idMeal !== idMeal);
    setFavorites(updated);
    localStorage.setItem(FAV_KEY, JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <h1 className="text-4xl font-bold text-center text-orange-700 mb-4">
        Dine favoritter
      </h1>

      <p className="text-center text-sm mb-6">
        <a href="/home" className="underline text-gray-700 hover:text-gray-900 mr-4">
          Til forsiden
        </a>
        <a href="/recipes" className="underline text-orange-600 hover:text-orange-800">
           Til oppskrifter
        </a>
      </p>

      {favorites.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          Du har ingen favoritter.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((meal) => (
            <div key={meal.idMeal} className="bg-white shadow p-4 rounded-md">
              <img src={meal.strMealThumb} className="rounded-md mb-3" />
              <h2 className="text-lg font-semibold">{meal.strMeal}</h2>
              <p className="text-gray-600">
                {meal.strArea} • {meal.strCategory}
              </p>

              <button
                onClick={() => removeFavorite(meal.idMeal)}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Fjern fra favoritter
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
