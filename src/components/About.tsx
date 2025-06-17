export default function About() {
  return (
    <div className="h-60 text-white p-4 md:p-6 lg:p-8 bg-gradient-to-tr from-black via-black to-gray-700 flex">
      <div className="w-1/4 flex items-center justify-center"> {/* Added justify-center */}
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mx-4 md:mx-6"> {/* Enhanced text styling */}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500"> {/* Gradient text */}
            EdenVibe
          </span>
        </h2>
      </div>
      <div className="w-3/4 flex flex-col justify-center space-y-4">
        <p className="text-base md:text-lg leading-relaxed tracking-wide"> {/* Improved readability */}
          <span className="drop-shadow-lg"> {/* Text shadow */}
            Your go-to for EDM | Elevate your mood with curated mixes for every vibe: 🏋‍♂ Gym, 🧘‍♀ Meditation, ✨ Reflection, & more!
          </span>
        </p>
      </div>
    </div>
  );
}