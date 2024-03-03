// src/components/NLP/TextSubmission.js
import React, { useState } from 'react';
import nlpService from '../../services/nlpService';
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  CircularProgress,
  Paper,
} from '@mui/material';

function TextSubmission({ token }) {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading state

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    try {
      // Split the text by new lines and trim each line
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
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading} // Disable the button when loading
              sx={{ mt: 3, mb: 2 }}
            >
              Submit Text
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
          {result && (
            <Typography component="pre" variant="body2" sx={{ mt: 2, overflowX: 'auto' }}>
              {JSON.stringify(result, null, 2)}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default TextSubmission;
