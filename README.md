# Dream Architects Website

A modern, responsive website for Dream Architects - a full-service architectural design firm. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🏗️ Interactive portfolio showcase
- 🎨 Modern, responsive design
- 🔄 Dynamic content management with Sanity CMS
- 📱 Mobile-first approach
- 🗺️ Google Maps integration for branch locations
- ⚡ Fast loading with Vite
- 🎭 Smooth animations with Framer Motion

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **CMS:** Sanity.io
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Maps:** Google Maps API

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Sanity CLI (for CMS management)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dream-architects-website.git
cd dream-architects-website
```
2. Install dependencies
```bash 
npm install
```
3. Create a .env file in the root directory with required environment variables:
```bash
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```
4. Start the development server
```bash
npm run dev
```

## Project structure

```md
dream-architects-website/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── lib/           # Utilities and API functions
│   ├── App.tsx        # Main app component
│   └── main.tsx       # Entry point
├── public/            # Static assets
├── studio/           # Sanity Studio configuration
└── package.json
```

## Available scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Content Management

This project uses Sanity.io for content management. The Sanity Studio is included in the `studio` directory.

To start the Sanity Studio locally:

```sh
cd studio
npm install
npm run dev
```

## Deployment

1. Build the project:
```sh
npm run build
```
 
2. The built files will be in the `dist` directory, ready to be deployed to your hosting provider.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For inquiries about Dream Architects' services:
- Phone: +256 758 198 298
- Email: info@dreamarchitects.com
- Address: Amber Heights, Ground Floor Suite A2, Plot 29/33 Kampala Road, Kitintale, Kampala - Uganda