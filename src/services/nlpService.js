// src/services/nlpService.js
import axios from 'axios';

const nlpService = {
  processText: async (textsArray, token) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/nlp/process/',
        { texts: textsArray },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default nlpService;
