export default function About() {
  return (
    <div className="h-72 text-white p-4 md:p-6 lg:p-8 bg-gradient-to-tr from-black via-black to-gray-700 flex">
      <div className="w-1/4 flex items-center">
        <h2 className="text-2xl font-bold">About EdenVibe360</h2>
      </div>
      <div className="w-3/4 flex flex-col justify-center space-y-4">
        <p className="text-base md:text-lg">
          Your go-to for EDM & Chill Beats 🌊 | Elevate your mood with curated mixes for every vibe: 🏋‍♂ Gym, 🧘‍♀ Meditation, ✨ Reflection, & more!
        </p>
      </div>
    </div>
  );
}