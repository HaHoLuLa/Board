import React from 'react';
import { motion } from 'framer-motion';
import { pageEffect } from '../styles/animation';

const Wrapper = ({ children, ...rest }) => {
  return (
    <motion.div
      style={{position: "absolute"}}
      initial="initial"
      animate="in"
      exit="out"
      transition={{ duration: 0.5 }}
      variants={pageEffect}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Wrapper;