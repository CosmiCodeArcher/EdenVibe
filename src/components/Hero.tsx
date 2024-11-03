export default function Hero() {
    return (
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            className="object-cover w-full h-full"
            autoPlay
            loop
            muted
            playsInline
            src="/videos/hero-background.mp4"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-6xl font-bold mb-4 animate-fade-in-up">
            Welcome to EdenVibe360
          </h1>
          <p className="text-2xl mb-8 animate-fade-in-up animation-delay-300">
            Your go-to for EDM & Chill Beats
          </p>
          <button className="px-8 py-3 bg-purple-600 text-white 
                             rounded-full text-lg font-semibold 
                             hover:bg-purple-700 transition-colors 
                             duration-300 animate-fade-in-up animation-delay-600">
            Explore Now
          </button>
        </div>
      </section>
    );
  }