# Database Migration Instructions

The ESG database tables have been created in the migration file, but need to be applied to your Supabase instance.

## Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard: https://app.supabase.com/project/vasoqhufojioslmultco
2. Navigate to **SQL Editor** in the left sidebar
3. Click **+ New query**
4. Copy and paste the contents of `supabase/migrations/20260102170000_esg_tables.sql`
5. Click **Run** to execute the migration
6. You should see a success message indicating all tables were created

## Option 2: Using Supabase CLI (After updating Command Line Tools)

```bash
# Update Command Line Tools first
sudo rm -rf /Library/Developer/CommandLineTools
sudo xcode-select --install

# Then install Supabase CLI
brew install supabase/tap/supabase

# Link to your project
cd /Users/vishale/cyrax-esg-agent
supabase link --project-ref vasoqhufojioslmultco

# Push migration
supabase db push
```

## Database Schema Created

The migration creates the following tables:

### Core ESG Data Tables
- `environmental_data` - Environmental metrics (emissions, energy, fleet, waste)
- `social_data` - Social metrics (safety, labor, human rights, diversity)
- `governance_data` - Governance metrics (board oversight, ethics, audits, cybersecurity)

### Supporting Tables
- `suppliers` - Supplier directory with risk scores
- `esg_reports` - Generated compliance reports
- `data_integrations` - Connected data sources
- `audit_logs` - Activity audit trail

### Features Included
- Row Level Security (RLS) policies for data isolation
- Automatic timestamp updates
- Indexed columns for performance
- Enums for data validation
- User role-based access control

## Next Steps

After running the migration:

1. The frontend hooks are already configured in `src/integrations/supabase/hooks/useESGData.ts`
2. You can start using them in your components:

```typescript
import { useEnvironmentalData, useCreateEnvironmentalData } from '@/integrations/supabase/hooks';

// In your component
const { data: envData } = useEnvironmentalData(companyId);
const createEnvData = useCreateEnvironmentalData();
```

3. All tables have Row Level Security enabled, ensuring users can only access their company's data
