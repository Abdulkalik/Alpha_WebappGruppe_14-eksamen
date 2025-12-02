"use client";

export function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-orange-100 px-4 text-center">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-orange-700 leading-tight">
        Velkommen til MatBuddy!
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg md:text-xl mb-6 text-gray-700 max-w-xl">
        Oppdag deilige oppskrifter fra hele verden, lagre dine favoritter, og få
        inspirasjon til ditt neste måltid.
      </p>

      {/* Button */}
      <div className="flex justify-center">
        <a
          href="/recipes"
          className="bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition text-base sm:text-lg w-full sm:w-auto"
        >
          Se oppskrifter
        </a>
      </div>
    </div>
  );
}
