# Frontend for Tech Entity Recognition

This React application serves as the frontend interface for the Tech Entity Recognition project, providing a user-friendly web interface for submitting text for NLP processing, including technology entity recognition, topic classification, and technology recommendations. It interacts with the FastAPI backend to deliver a seamless experience for users looking to leverage NLP and ML techniques in technology analysis.

## Key Features

- **Text Submission for NLP Processing**: Allows users to input text and submit it for backend NLP processing.
- **User Authentication**: Supports user registration and login, securing access to NLP functionalities.
- **Responsive UI**: Built with Material UI, offering a responsive and accessible user interface.
- **Deployment on GitHub Pages**: Utilizes GitHub Actions for CI/CD, enabling automated deployment to GitHub Pages.


### Deployment Process

1. **GitHub Actions Workflow**: Automated deployment is triggered by every push to the main branch.
2. **Build and Deployment**: Utilizes npm run build for production build generation and gh-pages for deployment to GitHub Pages.

For more details on our CI/CD process, refer to the package.json file's scripts section in our repository.


## Installation and Running the Application

Ensure you have Node.js and npm installed. Then, to run the application locally, execute:

```bash
npm start
```
This command installs all dependencies and starts the development server. The application will be accessible at http://localhost:3000.


## Project Structure

The project is structured as follows:


-   `src/`: Contains the source code of the application.
    -   `components/`:  UI components, including NLP text submission and authentication forms.
    -   `services/`: Services for interacting with the backend API, including `authService` and `nlpService`.
    -   `pages/`: Page components, such as the authentication page and the NLP processing page.
-   `public/`: Contains static assets and the index.html file.
-   `package.json`: Defines project dependencies and scripts for building and deploying the application.


## Running Tests

To run automated tests, use the following command:

```bash
npm test
```
This command executes the test suite configured with Jest and React Testing Library, ensuring the application's components function as expected.


## Conclusion

The Frontend for Tech Entity Recognition enhances the backend's capabilities by providing an intuitive interface for text submission and user interaction. It leverages modern web technologies and CI/CD practices for efficient development and deployment, offering a comprehensive solution for technology analysis through NLP.
