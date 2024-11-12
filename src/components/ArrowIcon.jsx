
const ArrowIcon = ({ onClick }) => (
  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 cursor-pointer z-10 bg-gray-800 p-2 rounded" onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-6 h-6 text-white"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  </div>
);

export default ArrowIcon;
