# Horse Comparison Application

A web application built with React, TypeScript, and Tailwind CSS for managing and comparing horses.

## Features

- View a list of horses with their details
- Add new horses to the database
- View detailed information about each horse
- Edit horse information


## Technologies Used

- React 19
- TypeScript
- Tailwind CSS
- Vite
- React Hook Form
- Zod (validation)
- React Query (data fetching)
- Shadcn UI (accessible components)
- Sonner (toast notifications)
- Vitest (testing)

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- Yarn or npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd horse-comparison-aml
   ```

2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

3. Start the development server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

- `src/` - Source code
  - `components/` - React components
  - `types.ts` - TypeScript type definitions
  - `App.tsx` - Main application component

## Available Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build the production-ready application
- `yarn lint` - Run ESLint to check for code issues
- `yarn preview` - Preview the production build locally
- `yarn test` - Run tests with Vitest


## ToDo

- Add comparison logic to compare selected horses
- Add tests for HorseDetailsModal
