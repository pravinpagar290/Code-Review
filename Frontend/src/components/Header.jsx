/* ----------  Header.jsx  ---------- */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const accent = '#6366f1';
const text   = '#111827';

export default function Header() {
  const { pathname } = useLocation();

  const navs = [
    { label: 'Home',      path: '/' },
    { label: 'Notes',     path: '/notes' },
    { label: 'Code Review', path: '/code-review' }
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,  opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255,255,255,.85)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 2rem'
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* logo */}
        <Link to="/" style={{ textDecoration: 'none', color: text, fontWeight: 700, fontSize: '1.25rem' }}>
          DevStudy AI
        </Link>

        {/* nav */}
        <nav style={{ display: 'flex', gap: 24 }}>
          {navs.map((n) => (
            <Link
              key={n.path}
              to={n.path}
              style={{
                position: 'relative',
                textDecoration: 'none',
                color: pathname === n.path ? accent : text,
                fontWeight: 500
              }}
            >
              {n.label}
              {pathname === n.path && (
                <motion.div
                  layoutId="underline"
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: -6,
                    height: 2,
                    background: accent
                  }}
                />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}