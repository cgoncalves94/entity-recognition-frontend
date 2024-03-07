// src/services/nlpService.js
import axios from 'axios';

/**
 * Service for processing text using NLP (Natural Language Processing).
 * @namespace nlpService
 */
const nlpService = {
  /**
   * Process an array of texts using NLP.
   * @async
   * @memberof nlpService
   * @param {Array<string>} textsArray - The array of texts to be processed.
   * @param {string} token - The authorization token.
   * @returns {Promise<any>} A promise that resolves to the processed data.
   * @throws {Error} If an error occurs during the processing.
   */
  processText: async (textsArray, token) => {
    try {
      const response = await axios.post(
        'http://34.30.10.247:8000/nlp/process/',
        { texts: textsArray },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Export the nlpService
export default nlpService;
