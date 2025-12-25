/* ----------  Notes.jsx  ---------- */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/api.js';

/* ----------  tiny design-system  ---------- */
const accent = '#6366f1';            // indigo-500
const surface  = '#ffffff';
const muted    = '#6b7280';         // gray-500
const subtle   = '#f3f4f6';         // gray-100
const text     = '#111827';         // gray-900

const container = {
  hidden: { opacity: 0 },
  show:  {
    opacity: 1,
    transition: { staggerChildren: 0.08, ease: 'easeOut' }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show:  { y: 0,  opacity: 1, transition: { duration: 0.35 } }
};

const scaleHover = { scale: 1.03, transition: { type: 'spring', stiffness: 400 } };

/* ----------  component  ---------- */
export default function Notes() {
  const [subject,   setSubject]   = useState('');
  const [branch,    setBranch]    = useState('');
  const [semester,  setSemester]  = useState('');
  const [topic,     setTopic]     = useState('');
  const [notes,     setNotes]     = useState('');
  const [loading,   setLoading]   = useState(false);

  const getNotes = async () => {
    setLoading(true);
    setNotes('');
    try {
      const { data } = await api.post('notes/get-notes', { subject, branch, semester, topic });
      setNotes(data);
    } catch {
      setNotes('Error: Could not fetch notes. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => e.preventDefault();

  return (
    <main
      style={{ background: subtle, minHeight: '100vh', padding: '4rem 1rem' }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          maxWidth: 720,
          margin: '0 auto',
          background: surface,
          borderRadius: 16,
          boxShadow: '0 10px 30px -10px rgba(0,0,0,.08)',
          padding: '2.5rem 2rem'
        }}
      >
        {/* ----------  header  ---------- */}
        <motion.div variants={item}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: text, margin: 0 }}>
            AI Notes Generator
          </h1>
          <p style={{ color: muted, marginTop: 4 }}>
            Get personalised study notes tailored to your subject, branch and semester.
          </p>
        </motion.div>

        {/* ----------  form  ---------- */}
        <motion.form
          variants={item}
          onSubmit={handleSubmit}
          style={{ marginTop: 32, display: 'grid', gap: 20 }}
        >
          <Input
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Data Structures"
          />
          <Input
            label="Branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            placeholder="e.g. Computer Science"
          />
          <Input
            label="Semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            placeholder="e.g. 4"
          />
          <Input
            label="Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Binary Trees"
          />

          <motion.button
            whileHover={scaleHover}
            whileTap={{ scale: 0.98 }}
            onClick={getNotes}
            disabled={loading}
            style={{
              marginTop: 8,
              padding: '14px 0',
              background: loading ? muted : accent,
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: 10,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Generating…' : 'Generate Notes'}
          </motion.button>
        </motion.form>

        {/* ----------  notes output  ---------- */}
        <AnimatePresence mode="wait">
          {notes && (
            <motion.section
              key="notes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                marginTop: 40,
                background: subtle,
                borderRadius: 12,
                padding: '1.5rem'
              }}
            >
              <h2 style={{ margin: '0 0 12px', fontSize: '1.25rem', color: text }}>
                Your Notes
              </h2>
              <pre
                style={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontFamily: `'Inter', sans-serif`,
                  color: text,
                  margin: 0
                }}
              >
                {notes}
              </pre>
            </motion.section>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}

/* ----------  styled input  ---------- */
function Input({ label, ...props }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', color: muted, fontSize: 14 }}>
      {label}
      <motion.input
        whileFocus={{ scale: 1.01 }}
        {...props}
        style={{
          marginTop: 6,
          padding: '12px 14px',
          border: `1px solid ${subtle}`,
          borderRadius: 8,
          fontSize: 16,
          color: text,
          outline: 'none',
          transition: 'border .2s'
        }}
        onFocus={(e) => (e.target.style.borderColor = accent)}
        onBlur={(e) => (e.target.style.borderColor = subtle)}
      />
    </label>
  );
}