# Technical Documentation

## Overview
This project is a client-side portfolio web application that demonstrates modern front-end development techniques including API integration, dynamic behavior, and state management.

The application is built using HTML, CSS, and JavaScript, with all functionality handled on the client side.

---

## Architecture
The application follows a simple structure:
- HTML for layout and structure
- CSS for styling and theming
- JavaScript for logic and interactivity

No backend or external frameworks are used.

---

## API Integration
The application integrates the Advice Slip API to fetch and display developer advice dynamically.

JavaScript `fetch()` is used to send a request to the external API endpoint. The response is received in JSON format and displayed on the page. If the API request fails, a user-friendly error message is shown.

---

## Complex Logic
The application includes multiple features demonstrating advanced logic:

- Filtering projects by category
- Searching projects by name
- Sorting projects alphabetically
- Form validation with multiple conditions
- Session timer that updates every second

These features require combining multiple conditions and updating the user interface dynamically.

---

## State Management
The application uses `localStorage` to store user data and preferences, including:

- Theme selection (light/dark mode)
- Visitor name for personalized greeting
- Selected project filter
- Selected sorting option

This ensures that user preferences persist across page reloads.

---

## Performance
Performance is improved by:

- Keeping the application lightweight (no external libraries)
- Removing unused CSS rules and duplicate files
- Using efficient DOM updates
- Organizing code into reusable functions

---

## User Experience Improvements
To improve usability, the application includes:

- Clear instructions in each section
- Step-by-step guidance in the README file
- Real-time feedback for user actions
- Validation messages for incorrect inputs
- Dynamic content updates

These improvements address previous feedback regarding limited user guidance.
