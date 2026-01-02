# AI-Powered ESG Report Generation

## Overview

CYRAX now includes a sophisticated multi-agent AI system for generating framework-compliant ESG reports directly from your dashboard data. The system uses specialized AI agents to analyze data, map to regulatory requirements, validate quality, and generate professional PDF reports.

## Features

### 🤖 Multi-Agent AI Architecture

The report generation system uses five specialized AI agents working in orchestrated sequence:

1. **Data Analysis Agent**
   - Analyzes ESG data across all three pillars (E, S, G)
   - Identifies key performance indicators and trends
   - Highlights areas of strength and improvement opportunities
   - Assesses data quality and completeness

2. **Regulatory Mapping Agent**
   - Maps your data to specific framework requirements
   - Supports GRI, TCFD, SASB, CSRD, CSDDD, and UK Modern Slavery Act
   - Calculates compliance percentages
   - Identifies gaps and provides recommendations

3. **Audit & Integrity Agent**
   - Validates data completeness and consistency
   - Assigns audit readiness scores
   - Identifies data quality issues
   - Provides remediation recommendations

4. **Report Generation Agent**
   - Creates professional executive summaries
   - Generates detailed section narratives for E, S, and G
   - Uses framework-specific language and terminology
   - Produces audit-ready content

5. **PDF Creation Engine**
   - Formats content with professional layouts
   - Includes data tables and metrics
   - Adds framework-specific styling
   - Creates downloadable PDF reports

## Supported Frameworks

| Framework | Full Name | Description |
|-----------|-----------|-------------|
| **GRI** | Global Reporting Initiative | Impact-focused, globally accepted reporting standard |
| **TCFD** | Task Force on Climate-related Financial Disclosures | Climate risk and financial exposure reporting |
| **SASB** | Sustainability Accounting Standards Board | Industry-specific sustainability metrics |
| **CSRD** | Corporate Sustainability Reporting Directive | EU mandatory sustainability reporting |
| **CSDDD** | Corporate Sustainability Due Diligence Directive | EU supply chain due diligence requirements |
| **UK Modern Slavery Act** | UK Modern Slavery Act | UK modern slavery statement requirements |

## Setup

### 1. Install Dependencies

The following packages have been installed:

```bash
npm install jspdf jspdf-autotable openai
```

### 2. Configure OpenAI API Key

Add your OpenAI API key to your `.env` file:

```bash
VITE_OPENAI_API_KEY=sk-your-openai-api-key-here
```

**Important:** The API key is required for AI-powered report generation. Without it, the report generation feature will not work.

### 3. Ensure ESG Data is Available

The system requires data in the following tables:
- `environmental_data` - Environmental metrics (emissions, energy, waste, etc.)
- `social_data` - Social metrics (labor, safety, human rights, etc.)
- `governance_data` - Governance metrics (board oversight, ethics, compliance, etc.)
- `suppliers` (optional) - Supplier risk and compliance data

## Usage

### From the Dashboard

1. Navigate to the **Dashboard** page
2. Scroll to the **AI-Powered Report Generation** card
3. Select your desired compliance framework (GRI, TCFD, SASB, etc.)
4. Set the reporting period dates
5. Optionally customize the report title
6. Click **"Generate AI Report"**

### Generation Process

The system will:
1. ✓ Collect ESG data from all sources
2. ✓ Analyze data using AI agents
3. ✓ Map data to framework requirements
4. ✓ Validate data quality and completeness
5. ✓ Generate narrative content
6. ✓ Create professional PDF report
7. ✓ Save report metadata to database
8. ✓ Automatically download the PDF

### Progress Tracking

Real-time progress updates show:
- Current agent/step in the workflow
- Overall completion percentage
- Step-by-step status indicators
- Error messages if issues occur

## Report Structure

### Cover Page
- Company name and branding
- Framework identification
- Reporting period
- Generation date

### Table of Contents
- Executive Summary
- Data Quality Assessment
- Environmental Performance
- Social Performance
- Governance Performance
- Regulatory Compliance Summary

### Executive Summary
- AI-generated overview (300-500 words)
- Key achievements and metrics
- Compliance status
- Areas for improvement

### Data Quality Assessment
- Completeness score
- Consistency score
- Accuracy score
- Audit readiness score
- Identified issues and recommendations

### ESG Sections
Each pillar includes:
- Section introduction
- Key metrics in tables
- Year-over-year trends
- Methodology notes
- Challenges and mitigation
- Future targets

### Regulatory Compliance
- Overall compliance percentage
- Requirement-by-requirement analysis
- Gap identification
- Recommendations for improvement

## File Structure

```
src/
├── services/
│   ├── ai/
│   │   └── agents.ts              # Multi-agent AI system
│   └── reports/
│       └── pdfGenerator.ts        # PDF report generation
└── components/
    └── dashboard/
        └── ReportGenerator.tsx    # UI component
```

### Key Files

#### `agents.ts`
Contains the AI agent implementations:
- `DataAnalysisAgent` - ESG data analysis
- `RegulatoryMappingAgent` - Framework mapping
- `AuditIntegrityAgent` - Data validation
- `ReportGenerationAgent` - Content generation
- `AgentOrchestrator` - Workflow coordination

#### `pdfGenerator.ts`
PDF creation service:
- Report layout and formatting
- Table generation
- Section structuring
- Framework-specific styling

#### `ReportGenerator.tsx`
Dashboard component:
- Framework selection UI
- Report configuration
- Progress tracking
- Download management

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Dashboard UI                       │
│         (Framework Selection, Configuration)         │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│              Agent Orchestrator                      │
│        (Coordinates Multi-Agent Workflow)            │
└──────────────────┬──────────────────────────────────┘
                   │
      ┌────────────┼────────────┐
      ▼            ▼            ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│  Data    │ │Regulatory│ │ Quality  │
│ Analysis │ │ Mapping  │ │Validation│
│  Agent   │ │  Agent   │ │  Agent   │
└──────────┘ └──────────┘ └──────────┘
      │            │            │
      └────────────┼────────────┘
                   ▼
         ┌──────────────────┐
         │ Report Generation│
         │     Agent        │
         └─────────┬────────┘
                   ▼
         ┌──────────────────┐
         │  PDF Generator   │
         └─────────┬────────┘
                   ▼
         ┌──────────────────┐
         │  Download PDF    │
         │  Save to DB      │
         └──────────────────┘
```

## AI Model Configuration

- **Model:** GPT-4o (OpenAI)
- **Temperature:** 0.2-0.4 (varies by agent for consistency vs. creativity)
- **Response Format:** JSON for structured outputs, text for narratives
- **Token Management:** Automatic chunking for large datasets

## Best Practices

### Data Quality
- Ensure all ESG data is complete and verified before generation
- Review data quality scores before finalizing reports
- Address identified gaps before submitting to auditors

### Framework Selection
- Choose the framework most relevant to your jurisdiction
- GRI is recommended as the primary/universal framework
- Consider generating multiple framework reports for comprehensive coverage

### Reporting Periods
- Align with fiscal year or calendar year
- Ensure data is available for the entire period
- Use consistent periods for year-over-year comparisons

### Review Process
1. Generate draft report
2. Review AI-generated content for accuracy
3. Verify all metrics and calculations
4. Add manual sections if needed (not yet automated)
5. Have ESG manager approve before publishing

## Production Considerations

### Security
⚠️ **Current Implementation:** OpenAI API calls are made from the browser with `dangerouslyAllowBrowser: true`

🔒 **Production Recommendation:** 
- Move AI processing to a secure backend API
- Never expose API keys in client-side code
- Implement rate limiting and authentication
- Use server-side report generation

### Storage
- Current: PDFs are created as Blobs and downloaded
- Production: Upload to Supabase Storage or S3
- Store file URLs in `esg_reports` table
- Implement access controls for report downloads

### Performance
- Large datasets may take 30-60 seconds to process
- Consider implementing job queues for async generation
- Cache frequently generated reports
- Implement progress webhooks for better UX

## Troubleshooting

### "Missing required data"
**Cause:** No ESG data in database
**Solution:** Add environmental, social, and governance data through the dashboard

### "OpenAI API key not configured"
**Cause:** Missing `VITE_OPENAI_API_KEY` in `.env`
**Solution:** Add your OpenAI API key to the `.env` file

### "Failed to analyze ESG data"
**Cause:** OpenAI API error or rate limit
**Solution:** Check API key validity, billing status, and rate limits

### Report generation stuck
**Cause:** Network timeout or API unavailable
**Solution:** Refresh page and try again. Check OpenAI status page.

## Future Enhancements

- [ ] Support for additional frameworks (CDP, DJSI, etc.)
- [ ] Custom report templates and branding
- [ ] Multi-language report generation
- [ ] Comparative analysis (YoY, industry benchmarks)
- [ ] Interactive charts and visualizations in PDFs
- [ ] Automated report scheduling
- [ ] Audit trail and version control
- [ ] Integration with external data sources
- [ ] Real-time collaboration and comments

## API Costs

Approximate OpenAI API costs per report:
- Small dataset (10-50 records): ~$0.10 - $0.30
- Medium dataset (50-200 records): ~$0.30 - $0.80
- Large dataset (200+ records): ~$0.80 - $2.00

**Note:** Costs vary based on data volume and selected model.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review OpenAI API documentation
3. Verify all environment variables are set
4. Check browser console for detailed error messages

## License

This feature is part of the CYRAX ESG platform.
