# CYRAX ESG Agent

> AI-Native ESG Intelligence & Reporting Platform for Global Logistics

## Overview

CYRAX is an enterprise-grade ESG (Environmental, Social, Governance) operating system that transforms fragmented ESG data into audit-ready compliance reports. Built specifically for global logistics companies, CYRAX automates compliance with CSRD, CSDDD, UK Modern Slavery Act, and other critical regulatory frameworks.

The platform features a **sophisticated multi-agent AI system** powered by GPT-4o that generates professional, framework-compliant ESG reports in seconds—complete with data analysis, regulatory mapping, quality validation, and audit-ready PDF output.

## Key Features

### 🤖 Multi-Agent AI Report Generation

**NEW:** Automated ESG report generation with specialized AI agents:

- **Data Analysis Agent**: Analyzes ESG data across all pillars, identifies trends, KPIs, and data quality issues
- **Regulatory Mapping Agent**: Maps your data to GRI, TCFD, SASB, CSRD, CSDDD, and UK Modern Slavery Act requirements
- **Audit & Integrity Agent**: Validates data completeness, consistency, and audit readiness
- **Report Generation Agent**: Creates professional narrative content with framework-specific language
- **PDF Creation Engine**: Generates publication-ready reports with tables, metrics, and professional formatting

**Supported Frameworks:**
- ✅ GRI (Global Reporting Initiative)
- ✅ TCFD (Task Force on Climate-related Financial Disclosures)
- ✅ SASB (Sustainability Accounting Standards Board)
- ✅ CSRD (Corporate Sustainability Reporting Directive)
- ✅ CSDDD (Corporate Sustainability Due Diligence Directive)
- ✅ UK Modern Slavery Act

📚 **[Read Full Documentation →](AI_REPORT_GENERATION.md)** | 🚀 **[Quick Start Guide →](QUICKSTART.md)**

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
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **AI Engine**: OpenAI GPT-4o
- **PDF Generation**: jsPDF + jsPDF-AutoTable
- **Charts**: Recharts
- **Date Handling**: date-fns

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

# Iet up environment variables
cp .env.example .env
# Edit .env and add your API keys (see Environment Variables section)

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173
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
dashboard/          # Dashboard components
│   │   │   ├── DashboardHeader.tsx
│   │   │   ├── DashboardSummary.tsx
│   │   │   ├── EnvironmentMetrics.tsx
│   │   │   ├── SocialMetrics.tsx
│   │   │   ├── GovernanceMetrics.tsx
│   │   │   └── ReportGenerator.tsx    # 🆕 AI Report Generation UI
│   │   ├── landing/            # Landing page components
│   │   │   ├── Hero.tsx
│   │   │   ├── AIOrchestration.tsx
│   │   │   ├── ESGPillars.tsx
│   │   │   ├── Integrations.tsx
│   │   │   └── Frameworks.tsx
│   │   └── ui/                 # Reusable UI components (shadcn/ui)
│   ├── pages/                  # Page components
│   │   ├── Index.tsx           # Landing page
│   │   ├── Dashboard.tsx       # ESG Dashboard
│   │   ├── Auth.tsx            # Authentication
│   │   └── NotFound.tsx
│   ├── services/               # 🆕 Business logic services
│   │   ├── ai/
│   │   │   └── agents.ts       # Multi-agent AI system
│   │   └── reports/
│   │       └── pdfGenerator.ts # PDF report generation
│   Database Setup

1. **Run Supabase migrations:**
   ```sh
   # Install Supabase CLI
   npm install -g supabase
   
   # Link to your project
   supabase link --project-ref your-project-ref
   
   # Run migrations
   supabase db push
   ```

2. **Verify tables created:**
   - `profiles` - User profiles
   - `user_roles` - User role assignments
   - `environmental_data` - Environmental metrics
   - `social_data` - Social metrics
   - `governance_data` - Governance metrics
   - `suppliers` - Supplier information
   - `esg_reports` - Generated reports
   -Production Considerations

⚠️ **Important for AI Report Generation:**

The current implementation uses client-side OpenAI API calls (for development convenience). For production:

1. **Move AI processing to backend API**
   - Create serverless functions or backend API
   - Never expose OpenAI API keys in client code
   - Remove `dangerouslyAllowBrowser: true`

2. **Implement file storage**
   - Upload PDFs to Supabase Storage or S3
   - Store file URLs in database
   - Implement access controls

3. **Add rate limiting**
   Features in Detail

### 🎯 ESG Dashboard
- Real-time metrics across Environmental, Social, and Governance pillars
- Data quality indicators and trends
- Compliance framework tracking
- Supplier risk management

### 🤖 AI-Powered Reports
- **6 Compliance Frameworks**: GRI, TCFD, SASB, CSRD, CSDDD, UK Modern Slavery Act
- **Multi-Agent Analysis**: Data quality, regulatory mapping, narrative generation
- **Professional Output**: Audit-ready PDFs with tables, metrics, and executive summaries
- **30-60 Second Generation**: From data to downloadable PDF

### 📊 Data Management
- Environmental metrics (emissions, energy, waste, fleet)
- Social metrics (labor, safety, diversity, human rights)
- Governance metrics (board oversight, ethics, compliance, audits)
- Supplier tracking and risk assessment

### 🔐 Security & Compliance
- Row-level security (RLS) policies
- Role-based access control (ESG Manager, Auditor, Supplier)
- Audit logging and data lineage
- Supabase authentication

## Documentation

- 📖 **[AI Report Generation Guide](AI_REPORT_GENERATION.md)** - Complete feature documentation
- 🚀 **[Quick Start Guide](QUICKSTART.md)** - Get started in 5 minutes
- 🏗️ **[Implementation Summary](IMPLEMENTATION_SUMMARY.md)** - Technical details
- 💾 **[Database Setup](DATABASE_SETUP_COMPLETE.md)** - Schema and migrations
- 🔄 **[Database Integration](DATABASE_INTEGRATION.md)** - Integration guide

## Troubleshooting

### Common Issues

**"Missing required data" when generating reports**
- Ensure you have ESG data in all three pillars (E, S, G)
- Add sample data through the dashboard

**"OpenAI API key not configured"**
- Add `VITE_OPENAI_API_KEY` to your `.env` file
- Restart the development server

**Build warnings about chunk size**
- Expected for development; production builds are optimized
- Consider code-splitting for larger applications

**Database connection errors**
- Verify Supabase URL and anon key in `.env`
- Check Supabase project is active
- Ensure migrations have been run

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Roadmap

- [ ] Additional frameworks (CDP, DJSI)
- [ ] Multi-language report generation
- [ ] Custom report templates and branding
- [ ] Real-time data integrations (ERP, TMS)
- [ ] Advanced analytics and benchmarking
- [ ] Mobile application
- [ ] API for third-party integrations
- [ ] Automated report scheduling

## License

Copyright © 2026 CYRAX. All rights reserved.

## Support

For support, please contact: support@cyrax.io

---

**Built with ❤️ for sustainable global logistics**

*Powered by AI | Framework-Agnostic | Regulation-Proof
### Environment Variables in Production

Set these in your hosting platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_OPENAI_API_KEY` (⚠️ Move to backend in production)
Generate framework-compliant ESG reports from the dashboard:

1. Navigate to Dashboard
2. Scroll to "AI-Powered Report Generation" card
3. Select framework (GRI, TCFD, SASB, etc.)
4. Configure reporting period
5. Click "Generate AI Report"
6. PDF downloads automatically

**Features:**
- ✨ Multi-agent AI analysis
- 📊 Data quality validation
- 📋 Framework-specific mapping
- 📄 Professional PDF output
- ⚡ 30-60 second generation time

📚 **[Full AI Report Documentation →](AI_REPORT_GENERATION.md)**  
🚀 **[Quick Start Guide →](QUICKSTART.md)**

### ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.tsx
│   │   └── use-toast.ts
│   ├── integrations/           # External integrations
│   │   └── supabase/
│   │       ├── client.ts
│   │       ├── types.ts
│   │       └── hooks/
│   │           ├── useESGData.ts    # ESG data hooks
│   │           └── index.ts
│   ├── lib/                    # Utility functions
│   ├── App.tsx                 # Main application component
│   └── main.tsx                # Application entry point
├── supabase/
│   ├── migrations/             # Database migrations
│   │   ├── 20260102165350_*.sql    # User profiles & roles
│   │   └── 20260102170000_*.sql    # ESG data tables
│   └── config.toml
├── public/                     # Static assets
├── .env.example                # Environment variables template
├── AI_REPORT_GENERATION.md     # 🆕 AI Report feature documentation
├── QUICKSTART.md               # 🆕 Quick start guide
├── IMPLEMENTATION_SUMMARY.md   # 🆕 Technical implementation details
│   ├── hooks/               # Custom React hooks
│   ├── integrations/        # External integrations (Supabase)
│   ├── lib/                 # Utility functions
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── public/                  # Static asse (see `.env.example`):

```env
# Supabase Configuration (Required)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration (Required for AI Report Generation)
VITE_OPENAI_API_KEY=sk-your-openai-api-key
```

### Getting API Keys

**Supabase:**
1. Create project at https://supabase.com
2. Go to Project Settings → API
3. Copy URL and anon/public key

**OpenAI:**
1. Sign up at https://platform.openai.com
2. Go to API Keys section
3. Create new secret key
4. Ensure you have available credits

💡 **Tip:** AI report generation requires OpenAI API access. Estimated cost: $0.20-$1.00 per report depending on data volume.Development

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
