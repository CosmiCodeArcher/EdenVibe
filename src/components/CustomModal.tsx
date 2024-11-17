import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, title, children }) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);
      
    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="bg-gradient-to-r from-black via-teal-600 to-blue-900 rounded-lg shadow-2xl p-6 max-w-lg w-full"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
            >
                {title && <h2 className="text-2xl font-semibold mb-4 text-white">{title}</h2>}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-red-600 hover:text-red-600 transition-colors duration-300"
                >
                    &times; {/* Close icon */}
                </button>
                <div className="absolute top-4 right-16 text-sm text-gray-300">
                    <span>Please close this menu to scroll.</span>
                </div>
                <div className="mt-6 max-h-96 overflow-y-auto">{children}</div>
            </motion.div>
        </motion.div>
    );
};

export default CustomModal;