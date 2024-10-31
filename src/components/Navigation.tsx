import React from 'react';

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = '' }: NavigationProps) {
  return (
    <nav className={`bg-gray-800 text-white p-2 ${className}`}>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">EdenVibe360</h1>
        <ul>
          <li>Placeholder for navigations</li>
        </ul>
        {/* Add navigation items here */}
      </div>
    </nav>
  );
}