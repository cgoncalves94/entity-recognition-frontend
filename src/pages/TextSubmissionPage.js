// src/pages/NLPPage.js
import { TextSubmission } from '../components/NLP';
import { Button, Container, Box } from '@mui/material';

/**
 * Renders the NLPPage component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.token - The authentication token.
 * @param {Function} props.onLogout - The logout function.
 * @returns {JSX.Element} The rendered NLPPage component.
 */
function NLPPage({ token, onLogout }) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button onClick={onLogout} color="inherit" variant="contained">
          Logout
        </Button>
      </Box>
      <TextSubmission token={token} />
    </Container>
  );
}

// Export the NLPPage component
export default NLPPage;