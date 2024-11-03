import Link from "next/link";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = '' }: NavigationProps) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-transparent text-white p-6 ${className}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link  href="/">
          <h1 className="text-2xl font-bold">EdenVibe360</h1>
        </Link>
        <ul className="flex space-x-8">
          <li><Link href='/collections' className="hover:text-purple-400 transition-colors duration-300">Collections</Link></li>
          <li><Link href='/categories' className="hover:text-purple-400 transition-colors duration-300">Categories</Link></li>
          <li><Link href='/about' className="hover:text-purple-400 transition-colors duration-300">About</Link></li>
        </ul>
      </div>
    </nav>
  );
}