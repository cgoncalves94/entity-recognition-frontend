// src/components/NLP/TextSubmission.js
import React, { useState } from 'react';
import nlpService from '../../services/nlpService';
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  LinearProgress,
  Paper,
} from '@mui/material';

/**
 * Component for submitting text for NLP processing.
 *
 * @param {Object} props - The component props.
 * @param {string} props.token - The authentication token.
 * @returns {JSX.Element} The TextSubmission component.
 */
function TextSubmission({ token }) {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Handles the form submission.
   *
   * @param {Event} event - The form submit event.
   * @returns {Promise<void>} A Promise that resolves when the submission is processed.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult(null); // Reset result state to clear previous output
    setLoading(true); // Start loading
    try {
      const texts = text.split('\n').map((line) => line.trim()).filter((line) => line);
      const response = await nlpService.processText(texts, token);
      setResult(response);
    } catch (error) {
      console.error('NLP processing failed:', error);
    }
    setLoading(false); // End loading
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ p: 2, marginTop: 8 }}>
        <Typography component="h1" variant="h5" gutterBottom>
          Text Submission for NLP Processing
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            multiline
            rows={4}
            margin="normal"
            required
            fullWidth
            id="nlp-text"
            label="Enter Text"
            name="text"
            autoComplete="text"
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            variant="outlined"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            Submit Text
          </Button>
          {loading && (
            <LinearProgress />
          )}
        </Box>
        {!loading && result && (
          <Typography component="pre" variant="body2" sx={{ mt: 2, overflowX: 'auto' }}>
            {JSON.stringify(result, null, 2)}
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

export default TextSubmission;
