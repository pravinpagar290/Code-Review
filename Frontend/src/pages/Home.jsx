/* ----------  Home.jsx  ---------- */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // react-router v6 assumed

/* ----------  design tokens  ---------- */
const accent  = '#6366f1';            // indigo-500
const surface = '#ffffff';
const subtle  = '#f3f4f6';            // gray-100
const muted   = '#6b7280';            // gray-500
const text    = '#111827';            // gray-900

const container = {
  hidden: { opacity: 0 },
  show:  { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { y: 30, opacity: 0 },
  show:  { y: 0,  opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } }
};

const scaleHover = { scale: 1.03, transition: { type: 'spring', stiffness: 400 } };

/* ----------  component  ---------- */
export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: subtle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          width: '100%',
          maxWidth: 860,
          background: surface,
          borderRadius: 20,
          boxShadow: '0 20px 40px -10px rgba(0,0,0,.08)',
          padding: '4rem 3rem',
          textAlign: 'center'
        }}
      >
        <motion.h1 variants={item} style={{ fontSize: '2.75rem', fontWeight: 800, color: text, margin: 0 }}>
          DevStudy AI
        </motion.h1>
        <motion.p variants={item} style={{ marginTop: 12, color: muted, fontSize: '1.125rem' }}>
          Two tools, zero setup — boost your productivity in seconds.
        </motion.p>

        <motion.div
          variants={item}
          style={{ marginTop: 48, display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}
        >
          <Card
            title="AI Notes Generator"
            desc="Paste your subject, branch and topic — get concise, exam-ready notes."
            link="/notes"
            icon="📝"
          />
          <Card
            title="AI Code Reviewer"
            desc="Drop in any code snippet and receive an instant, line-by-line review."
            link="/code-review"
            icon="🔍"
          />
        </motion.div>

        <motion.div variants={item} style={{ marginTop: 56, fontSize: 14, color: muted }}>
          Built with React, Framer-Motion & a sprinkle of vanilla focus.
        </motion.div>
      </motion.div>
    </main>
  );
}

/* ----------  reusable card  ---------- */
function Card({ title, desc, link, icon }) {
  return (
    <motion.div
      whileHover={scaleHover}
      style={{
        background: subtle,
        borderRadius: 16,
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        cursor: 'pointer'
      }}
    >
      <span style={{ fontSize: 40 }}>{icon}</span>
      <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: text }}>{title}</h2>
      <p style={{ margin: 0, color: muted, flex: 1 }}>{desc}</p>
      <Link to={link} style={{ textDecoration: 'none', width: '100%' }}>
        <motion.button
          whileTap={{ scale: 0.96 }}
          style={{
            marginTop: 16,
            width: '100%',
            padding: '12px 0',
            background: accent,
            color: '#fff',
            fontSize: '1rem',
            fontWeight: 600,
            border: 'none',
            borderRadius: 10
          }}
        >
          Launch
        </motion.button>
      </Link>
    </motion.div>
  );
}