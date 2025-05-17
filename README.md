# Nexa - Albertsons Next Generation Audiences

Nexa is a next genenration Audience generation and insights built for Albertsons. It provides an intuitive interface for creating and managing audiences for marketing campaigns.

## Features

- **Admin Panel**: Sidebar navigation for easy access to all features
- **Campaign Creation**: Step-by-step interface with tabbed navigation
- **Campaign Management**: View and manage all your campaigns in one place
- **Material Design**: Modern UI with Albertsons brand colors

## Technologies Used

- React 19
- React Router 7
- Vite 6
- Material Design (CSS implementation)

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Getting Started

Follow these instructions to set up the project on your local machine.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/albertsons/nexa.git
cd nexa
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:5173
```

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm run lint`: Runs ESLint to check for code issues
- `npm run preview`: Previews the production build locally

## Project Structure

```
src/
  ├── assets/         # Static assets like images and icons
  ├── components/     # Reusable UI components
  ├── App.jsx         # Main application component
  ├── App.css         # Application styles
  ├── main.jsx        # Entry point
  └── index.css       # Global styles
```

## Deployment

To deploy this application to production:

```bash
npm run build
```

This will create a `dist` folder with optimized production files that can be deployed to any static hosting service.

## License

[MIT License](LICENSE)
