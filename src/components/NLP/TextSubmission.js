// src/components/NLP/TextSubmission.js
import React, { useState } from 'react';
import nlpService from '../../services/nlpService';
import { Button, TextField, Container, Typography, Box, LinearProgress, Paper, Card, CardContent, Chip, CardActionArea } from '@mui/material';

function TextSubmission({ token }) {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blueprints, setBlueprints] = useState(null);

  /**
   * Handles the form submission for processing text.
   *
   * @param {Event} event - The form submission event.
   * @returns {Promise<void>} - A promise that resolves when the text processing is complete.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setBlueprints(null);
    setResult(null);
    setLoading(true);

    try {
      const texts = text.split('\n').map((line) => line.trim()).filter((line) => line);
      const response = await nlpService.processText(texts, token);
      setResult(response);
    } catch (error) {
      console.error('NLP processing failed:', error);
    }

    setLoading(false);
  };

  /**
   * Handles the process of finding blueprints.
   * @async
   * @function handleFindBlueprints
   * @returns {Promise<void>} A promise that resolves when the blueprints are found.
   */
  const handleFindBlueprints = async () => {
    setLoading(true);

    try {
      const matchedBlueprints = await nlpService.matchBlueprints(result, token);
      setBlueprints(matchedBlueprints);
    } catch (error) {
      console.error('Error matching blueprints:', error);
    }

    setLoading(false);
  };

/**
 * Generates a recommendation text based on the input result.
 * @returns {string} The generated recommendation text.
 */
const generateRecommendationText = () => {
  if (!result || !result.length) return '';

  const allRecommendations = result.flatMap(item => item.recommendations);
  const uniqueRecommendations = Array.from(new Set(allRecommendations.map(rec => rec.recommendation)));
  const recommendationText = uniqueRecommendations.join(', ');

  return `Based on your input, the following entities are recommended: ${recommendationText}. Would you like to match these against existing blueprints?`;
};

  /**
   * Handles the click event for a blueprint.
   * Opens the corresponding repository URL in a new tab.
   *
   * @param {string} blueprintPath - The path to the blueprint.
   * @returns {void}
   */
  const handleBlueprintClick = (blueprintPath) => {
    const repoUrl = `https://github.com/warestack/platform/tree/main/${blueprintPath}`;
    window.open(repoUrl, '_blank');
  };

  return (
    <Container component="main" maxWidth="lg">
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
          <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 3, mb: 2 }}>
            Submit Text
          </Button>
          {loading && <LinearProgress />}
        </Box>
        {!loading && result && (
          <>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {generateRecommendationText()}
            </Typography>
            <Button onClick={handleFindBlueprints} fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
              Find Blueprints
            </Button>
          </>
        )}
        {!loading && blueprints && (
          <>
            <Typography variant="h6" sx={{ mt: 4 }}>
              Matched Blueprints:
            </Typography>
            {blueprints.map((result) => (
              <Box key={result.id} sx={{ mt: 2 }}>
                {result.matched_blueprints.map((blueprint) => (
                  <Card key={blueprint.id} sx={{ mb: 2 }}>
                    <CardActionArea onClick={() => handleBlueprintClick(blueprint.path)}>
                      <CardContent>
                        <Typography variant="h6">{blueprint.name}</Typography>
                        <Typography color="textSecondary">{blueprint.path}</Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          {blueprint.description}
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                          {blueprint.matched_tags.map((tag, tagIdx) => (
                            <Chip
                              key={tag.id}
                              label={tag}
                              variant="outlined"
                              size="small"
                              sx={{ mr: 1 }}
                            />
                          ))}
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Box>
            ))}
          </>
        )}
      </Paper>
    </Container>
  );
}

export default TextSubmission;