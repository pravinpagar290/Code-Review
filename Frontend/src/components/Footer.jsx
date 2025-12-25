/* ----------  Footer.jsx  ---------- */
import React from 'react';
import { motion } from 'framer-motion';

const muted = '#6b7280';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      style={{
        marginTop: 'auto',
        padding: '2.5rem 2rem',
        textAlign: 'center',
        fontSize: 14,
        color: muted,
        background: '#f9fafb',
        borderTop: '1px solid #e5e7eb'
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        © {new Date().getFullYear()} DevStudy AI &nbsp;·&nbsp; Built with React, Framer-Motion & love.
      </div>
    </motion.footer>
  );
}