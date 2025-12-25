/* ----------  CodeReview.jsx  ---------- */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from 'react-simple-code-editor';
import 'prismjs/themes/prism-tomorrow.css';
import api from '../api/api.js';

/* ----------  shared palette (same as Notes)  ---------- */
const accent  = '#6366f1';            // indigo-500
const surface = '#ffffff';            // white
const subtle  = '#f3f4f6';            // gray-100
const muted   = '#6b7280';            // gray-500
const text    = '#111827';            // gray-900

const scaleHover = { scale: 1.03, transition: { type: 'spring', stiffness: 400 } };

/* ----------  component  ---------- */
export default function CodeReview() {
  const [code, setCode] = useState(
`function App() {
  return <h1>Hello Code Reviewer!</h1>
}`
  );
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState('Copy Review');

  const reviewCode = async () => {
    setLoading(true);
    setReview('');
    try {
      setCopyStatus('Copy Review');
      const { data } = await api.post('/ai/get-review', { code });
      setReview(data);
    } catch {
      setReview('Error: Could not fetch review. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!review) return;
    navigator.clipboard
      .writeText(review)
      .then(() => {
        setCopyStatus('Copied!');
        setTimeout(() => setCopyStatus('Copy Review'), 2000);
      })
      .catch(() => {
        setCopyStatus('Failed to copy!');
        setTimeout(() => setCopyStatus('Copy Review'), 2000);
      });
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background: subtle,
        padding: '4rem 1rem'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          maxWidth: 900,
          margin: '0 auto',
          background: surface,
          borderRadius: 20,
          boxShadow: '0 20px 40px -10px rgba(0,0,0,.08)',
          padding: '3rem'
        }}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: '2rem', fontWeight: 700, color: text, margin: 0 }}
        >
          AI Code Reviewer
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ marginTop: 8, color: muted }}
        >
          Paste your code and receive an instant, line-by-line review.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}
        >
          {/* ----------  editor card  ---------- */}
          <div
            style={{
              background: subtle,
              borderRadius: 16,
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: text }}>
              Code Input
            </h2>
            <div
              style={{
                marginTop: 12,
                border: `1px solid #e5e7eb`,
                borderRadius: 12,
                overflow: 'hidden',
                background: '#0b0f19',
                flex: 1
              }}
            >
              <Editor
                value={code}
                onValueChange={setCode}
                highlight={(c) => <span>{c}</span>}
                padding={16}
                style={{
                  minHeight: 280,
                  fontFamily: '"Fira Code", monospace',
                  fontSize: 14
                }}
              />
            </div>
          </div>

          {/* ----------  review card  ---------- */}
          <div
            style={{
              background: subtle,
              borderRadius: 16,
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
          >
            <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: text }}>
              Review Output
            </h2>
            <div
              style={{
                marginTop: 12,
                flex: 1,
                border: `1px solid #e5e7eb`,
                borderRadius: 12,
                padding: '1rem',
                background: surface,
                fontSize: 15,
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                color: text
              }}
            >
              <AnimatePresence mode="wait">
                {loading && (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ color: muted, textAlign: 'center' }}
                  >
                    Analysing your code – one moment…
                  </motion.div>
                )}

                {review && !loading && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {review}
                  </motion.div>
                )}

                {!review && !loading && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ color: muted, fontStyle: 'italic', textAlign: 'center' }}
                  >
                    Your AI code-review will appear here after you click “Get AI Review”.
                  </motion.div>
                )}
              </AnimatePresence>

              {review && !loading && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={scaleHover}
                  onClick={handleCopy}
                  style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    padding: '6px 12px',
                    fontSize: 12,
                    background: accent,
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer'
                  }}
                >
                  {copyStatus}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ marginTop: 32, textAlign: 'center' }}
        >
          <motion.button
            whileHover={scaleHover}
            whileTap={{ scale: 0.98 }}
            onClick={reviewCode}
            disabled={loading}
            style={{
              padding: '14px 32px',
              background: loading ? muted : accent,
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: 12,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Reviewing…' : 'Get AI Review'}
          </motion.button>
        </motion.div>
      </motion.div>
    </main>
  );
}