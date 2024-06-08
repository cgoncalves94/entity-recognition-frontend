// src/services/nlpService.js
import axios from "axios";

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
                "https://ers-dev.warestack.com/nlp/process/",
                { texts: textsArray },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Match recommendations with blueprints.
     * @async
     * @memberof nlpService
     * @param {Array<Object>} recommendations - The recommendations to match with blueprints.
     * @param {string} token - The authorization token.
     * @returns {Promise<any>} A promise that resolves to the matched blueprints data.
     * @throws {Error} If an error occurs during matching.
     */
    matchBlueprints: async (recommendations, token) => {
        try {
            const response = await axios.post(
                "https://ers-dev.warestack.com/nlp/match-blueprints/",
                recommendations,
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
