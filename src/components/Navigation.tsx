'use client'

interface NavigationProps {
  className?: string;
}


export default function Navigation({ className = '' }: NavigationProps) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-transparent text-white p-6 ${className}`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold cursor-pointer hover:text-purple-400 transition-colors duration-300" onClick={() => window.scrollTo(0, 0)}>
          EdenVibe360
        </h1>
        <ul className="flex space-x-8">
          
          <li>
            <a href="#about" className="hover:text-purple-400 transition-colors duration-300">
              About
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
