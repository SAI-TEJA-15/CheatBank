# CheatSheet Hub

A modern, responsive web application for creating, browsing, and sharing cheat sheets. Built with React and Vite, featuring a clean dark theme inspired by professional developer tools.

## Features

### 🏠 Home Page
- Showcase trending cheat sheets
- Browse by categories
- Search functionality with real-time results
- Responsive grid layout

### 📖 Cheat Sheet Viewer
- Clean, readable display of cheat sheets
- Copy code snippets to clipboard
- Download as PDF or plain text
- View statistics (views, likes, downloads)
- Like/unlike functionality

### ✏️ Cheat Sheet Builder
- Intuitive form-based editor
- Add multiple sections with code examples
- Rich text formatting
- Tag and categorize content
- Real-time preview

### 👤 User Accounts
- Mock authentication system
- User profiles with created cheat sheets
- Persistent data using localStorage
- Avatar generation

### 🔍 Search & Filter
- Full-text search across titles, descriptions, and content
- Filter by categories and tags
- Sort by popularity, date, or downloads
- Advanced search options

### 📱 Responsive Design
- Mobile-first approach
- Clean, professional dark theme
- Smooth animations and transitions
- Optimized for all screen sizes

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Storage**: localStorage for data persistence
- **Icons**: Lucide React
- **PDF Generation**: jsPDF with html2canvas

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone or download the project files
2. Navigate to the project directory
3. Install dependencies:

\`\`\`bash
npm install
\`\`\`

### Development

Start the development server:

\`\`\`bash
npm run dev
\`\`\`

The application will be available at `http://localhost:3000`

### Building for Production

Create a production build:

\`\`\`bash
npm run build
\`\`\`

Preview the production build:

\`\`\`bash
npm run preview
\`\`\`

## Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Layout components (Header, Footer, etc.)
│   ├── CheatSheet/     # Cheat sheet related components
│   ├── Search/         # Search and filter components
│   └── UI/             # Basic UI components
├── contexts/           # React Context providers
│   ├── AuthContext.jsx      # Authentication state
│   └── CheatSheetContext.jsx # Cheat sheet data management
├── pages/              # Page components
├── data/               # Sample data and constants
├── utils/              # Utility functions
└── hooks/              # Custom React hooks
\`\`\`

## Key Features Explained

### Data Management
- All data is stored in localStorage for persistence
- Context API manages global state
- Sample data is pre-loaded for demonstration

### Authentication
- Mock authentication system
- User registration and login
- Profile management
- Session persistence

### Cheat Sheet Operations
- Create, read, update, delete (CRUD) operations
- View tracking and analytics
- Like/unlike functionality
- Download capabilities

### Search System
- Real-time search across all content
- Category and tag filtering
- Multiple sorting options
- Responsive search results

## Sample Data

The application comes pre-loaded with sample cheat sheets covering:
- React Hooks Reference
- Git Commands
- CSS Flexbox Guide
- JavaScript ES6+ Features
- Python Data Structures
- Docker Commands Reference

## Customization

### Styling
- Modify `src/index.css` for global styles
- Update `tailwind.config.js` for theme customization
- Component-specific styles use Tailwind classes

### Adding Categories
- Update sample data in `src/data/sampleData.js`
- Categories are automatically extracted from cheat sheet data

### Extending Functionality
- Add new pages in `src/pages/`
- Create reusable components in `src/components/`
- Extend context providers for new features

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a demonstration project. To extend functionality:

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Design inspired by modern developer tools and documentation sites
- Sample content created for educational purposes
- Icons provided by Lucide React
- Fonts from Google Fonts (Inter, JetBrains Mono)
