# Quick Start: AI-Powered Report Generation

## Prerequisites

✅ Node.js installed  
✅ CYRAX platform running  
✅ OpenAI API account with available credits  
✅ ESG data in your database  

## Setup (5 minutes)

### 1. Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

### 2. Configure Environment

Create or update `.env` in project root:

```bash
# Add your OpenAI API key
VITE_OPENAI_API_KEY=sk-your-actual-api-key-here

# Your existing Supabase config
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-key
```

### 3. Restart Development Server

```bash
npm run dev
```

## First Report (2 minutes)

### 1. Login to Dashboard

- Navigate to http://localhost:5173
- Login with your ESG Manager account

### 2. Add Sample ESG Data (if needed)

If you don't have data yet, add some sample records:

**Environmental Data:**
- Scope 1 Emissions: 1200 tCO2e
- Scope 2 Emissions: 800 tCO2e
- Renewable Energy: 25%

**Social Data:**
- Total Employees: 500
- Training Hours/Employee: 40
- Incident Rate: 2.5

**Governance Data:**
- Board ESG Oversight: Yes
- Independent Directors: 60%
- Internal Audits: 4

### 3. Generate Report

1. Scroll to **"AI-Powered Report Generation"** card
2. Select framework: **GRI Standards**
3. Set dates: 
   - Start: `2024-01-01`
   - End: `2024-12-31`
4. Click **"Generate AI Report"**

### 4. Watch Progress

The system will:
- ✓ Collect data (~2 seconds)
- ✓ Analyze with AI (~10 seconds)
- ✓ Map to framework (~8 seconds)
- ✓ Validate quality (~5 seconds)
- ✓ Generate content (~15 seconds)
- ✓ Create PDF (~5 seconds)
- ✓ Save to database (~2 seconds)

**Total time: 30-60 seconds**

### 5. Review Your Report

The PDF will download automatically. It includes:

- ✅ Professional cover page
- ✅ Table of contents
- ✅ AI-generated executive summary
- ✅ Data quality assessment
- ✅ Environmental section with metrics
- ✅ Social section with metrics
- ✅ Governance section with metrics
- ✅ Regulatory compliance summary

## Supported Frameworks

Try generating reports for different frameworks:

| Framework | Best For |
|-----------|----------|
| **GRI** | Universal/comprehensive reporting |
| **TCFD** | Climate risk and financial disclosure |
| **SASB** | Industry-specific metrics (Transportation) |
| **CSRD** | EU companies (mandatory 2024+) |
| **CSDDD** | Supply chain due diligence |
| **UK Modern Slavery** | UK companies with £36M+ revenue |

## Troubleshooting

### "Missing required data"
**Fix:** Add ESG data through the dashboard first

### "OpenAI API key not configured"
**Fix:** Add `VITE_OPENAI_API_KEY` to `.env` and restart server

### "Failed to analyze ESG data"
**Fix:** Check:
- OpenAI API key is valid
- Account has available credits
- No rate limits exceeded

### Report looks incomplete
**Fix:** Add more comprehensive ESG data across all three pillars

## Cost Management

Estimated API costs:
- First report (testing): ~$0.20
- Regular report (good data): ~$0.50
- Comprehensive report: ~$1.00

**Tip:** Start with small datasets to test before generating full reports.

## Next Steps

1. ✅ Generate your first GRI report
2. ✅ Review AI-generated content
3. ✅ Try different frameworks
4. ✅ Add more comprehensive ESG data
5. ✅ Share reports with auditors
6. 📚 Read full documentation in `AI_REPORT_GENERATION.md`

## Production Deployment

Before production:

- [ ] Move AI processing to backend API
- [ ] Remove `dangerouslyAllowBrowser: true`
- [ ] Upload PDFs to storage (not URLs)
- [ ] Implement access controls
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting

## Support

- 📖 Full docs: `AI_REPORT_GENERATION.md`
- 🔍 Implementation details: `IMPLEMENTATION_SUMMARY.md`
- 🐛 Check browser console for errors
- 💬 OpenAI status: https://status.openai.com

---

**You're ready to generate AI-powered ESG reports! 🎉**

Start with GRI framework and your existing data, then explore other frameworks and features.
