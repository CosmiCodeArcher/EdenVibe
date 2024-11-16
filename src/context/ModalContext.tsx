import { createContext, useContext, useState } from 'react';

interface ModalContextType {
    openModalId: string | null;
    openModal: (id: string) => void;
    closeModal: () => void;
  }

  const ModalContext = createContext<ModalContextType | undefined>(undefined);

  export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [openModalId, setOpenModalId] = useState<string | null>(null);
  
    const openModal = (id: string) => {
      setOpenModalId(id);
    };
  
    const closeModal = () => {
      setOpenModalId(null);
    };
  
    return (
      <ModalContext.Provider value={{ openModalId, openModal, closeModal }}>
        {children}
      </ModalContext.Provider>
    );
  };
  
  export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
      throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
  };