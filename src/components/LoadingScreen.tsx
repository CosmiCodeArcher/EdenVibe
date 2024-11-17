import { useEffect } from "react";

const generateStars = (count: number, container: HTMLElement) => {
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 3 + 1;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      
      const star = document.createElement('div');
      star.className = 'absolute rounded-full bg-white';
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${left}%`;
      star.style.top = `${top}%`;
      star.style.opacity = `${Math.random()}`; // Random opacity for twinkling effect
      star.style.zIndex = '0';

      container.appendChild(star);
  }
  };

export default function LoadingScreen() {
    useEffect(() => {
      const starCount = 100;
      const starContainer = document.getElementById('star-container');
      if (starContainer) {
        generateStars(starCount, starContainer);
      }
    }, []);
    
      return (
        <div className="relative flex flex-col justify-center items-center h-screen bg-black text-white overflow-hidden">
          <div 
            id="star-container" 
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        ></div>
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 z-10">
            Welcome to EdenVibe360
          </h1>
          <p className="text-lg font-semibold tracking-wider text-gray-300 z-10">
            Bringing you the beats for every moment...
          </p>
          <div className="mt-4 z-10">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
          </div>
        </div>
      );
  }