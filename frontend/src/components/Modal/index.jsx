import React from 'react';
import './style.css';
import { motion, AnimatePresence } from 'framer-motion';

export const Modal = ({ modal, setModal, children }) => {
  return (
    <AnimatePresence>
      {modal && (
        <>
          <motion.div
            className="fade"
            onClick={() => setModal(false)}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.2
              }
            }}
            exit={{ opacity: 0, delay: 0.2 }}
          />
          <motion.div
            className="modal"
            initial={{ x: 'calc(50vw - 50%)', y: '-100vh' }}
            animate={{
              y: 'calc(50vh - 50%)',
              transition: {
                delay: 0.3
              }
            }}
            exit={{
              x: 'calc(50vw - 50%)',
              y: '-100vh',
              transition: {
                duration: 0.3
              }
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
