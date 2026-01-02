# CYRAX ESG Agent

> AI-Native ESG Intelligence & Reporting Platform for Global Logistics

## Overview

CYRAX is an enterprise-grade ESG (Environmental, Social, Governance) operating system that transforms fragmented ESG data into audit-ready compliance reports. Built specifically for global logistics companies, CYRAX automates compliance with CSRD, CSDDD, UK Modern Slavery Act, and other critical regulatory frameworks.

## Key Features

### 🤖 Multi-Agent AI Orchestration
- **Data Ingestion Agent**: Parses structured/unstructured data and normalizes into ESG schema
- **Supplier Intelligence Agent**: Maps Tier-1 → Tier-N suppliers with risk scoring
- **Regulatory Mapping Agent**: Automatically maps data to GRI, TCFD, SASB frameworks
- **Reporting Agent**: Generates PDF, DOCX, XBRL with framework-specific language
- **Audit & Integrity Agent**: Maintains immutable audit trail with data lineage

### 📊 ESG Coverage
- **Environmental**: Carbon accounting, fleet emissions, Scope 1/2/3, warehouse energy
- **Social**: Labor rights, health & safety, wage compliance, supply chain integrity
- **Governance**: Board oversight, ethics policies, cybersecurity, regulatory tracking

### 🔗 Integrations
- ERP systems (SAP, Oracle, Microsoft Dynamics)
- TMS platforms (Manhattan, Blue Yonder)
- Data lakes (Databricks, Snowflake, AWS S3, Azure Data Lake)
- Supplier platforms (Ariba, Coupa)

### 📋 Regulatory Frameworks
- CSRD (Corporate Sustainability Reporting Directive)
- CSDDD (Corporate Sustainability Due Diligence Directive)
- GRI (Global Reporting Initiative)
- TCFD (Task Force on Climate-related Financial Disclosures)
- SASB (Sustainability Accounting Standards Board)
- UK Modern Slavery Act

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Framework**: shadcn/ui + Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v6
- **Backend**: Supabase
- **AI Orchestration**: LangChain + LangGraph

## Getting Started

### Prerequisites

- Node.js 18+ and npm (recommended to install via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Git

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd cyrax-esg-agent

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Available Scripts

```sh
# Start development server
npm run dev

# Build for production
npm run build

# Build for development environment
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Project Structure

```
cyrax-esg-agent/
├── src/
│   ├── components/
│   │   ├── landing/          # Landing page components
│   │   │   ├── Hero.tsx
│   │   │   ├── AIOrchestration.tsx
│   │   │   ├── ESGPillars.tsx
│   │   │   ├── Integrations.tsx
│   │   │   ├── Frameworks.tsx
│   │   │   └── ...
│   │   └── ui/              # Reusable UI components (shadcn/ui)
│   ├── pages/               # Page components
│   ├── hooks/               # Custom React hooks
│   ├── integrations/        # External integrations (Supabase)
│   ├── lib/                 # Utility functions
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── supabase/               # Supabase configuration
└── package.json
```

## Development

### Code Style

This project uses ESLint for code quality. Run `npm run lint` to check for issues.

### Component Library

UI components are built with shadcn/ui, a collection of re-usable components built with Radix UI and Tailwind CSS. Components are located in `src/components/ui/`.

## Deployment

### Production Build

```sh
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deployment Options

- **Vercel**: Connect your repository and deploy automatically
- **Netlify**: Drag and drop the `dist/` folder or connect via Git
- **AWS S3 + CloudFront**: Upload `dist/` to S3 and configure CloudFront
- **Azure Static Web Apps**: Deploy via Azure CLI or GitHub Actions
- **Traditional Hosting**: Upload the `dist/` folder to any static hosting service

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Copyright © 2026 CYRAX. All rights reserved.

## Support

For support, please contact: support@cyrax.io

---

**Built with ❤️ for sustainable global logistics**
