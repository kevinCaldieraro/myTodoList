import React from 'react';
import './style.css';
import { motion, AnimatePresence } from 'framer-motion';

export const Modal = ({
  type,
  title,
  modal,
  setModal,
  setInputTag,
  setTagsToRemove,
  tagsToRemoveInitial,
  children
}) => {
  return (
    <AnimatePresence>
      {modal && (
        <>
          <motion.div
            className="fade"
            onClick={() => {
              setModal(false);
              if (type === 'createTag') {
                setInputTag('');
              }
              // else {
              //   setTagsToRemove(tagsToRemoveInitial);
              // }
            }}
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
            <header className="modalHeader">
              <h2>{title}</h2>
              <button
                className="closeModal"
                type="button"
                onClick={() => {
                  setModal(false);
                  if (type === 'createTag') {
                    setInputTag('');
                  }
                  // else {
                  //   setTagsToRemove(tagsToRemoveInitial);
                  // }
                }}
              >
                X
              </button>
            </header>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
