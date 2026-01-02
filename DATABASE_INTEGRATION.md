# Database Integration Guide

## Overview

The CYRAX ESG Agent dashboard is now connected to Supabase with comprehensive ESG data tables. This guide explains how the database integration works and how to use it.

## Database Schema

### Tables Created

1. **environmental_data** - Tracks environmental metrics
   - Emissions (Scope 1, 2, 3)
   - Energy consumption
   - Fleet composition
   - Waste management

2. **social_data** - Tracks social metrics
   - Health & safety incidents
   - Employee training
   - Labor compliance
   - Diversity metrics

3. **governance_data** - Tracks governance metrics
   - Board oversight
   - Ethics violations
   - Audit completion
   - Cybersecurity incidents

4. **suppliers** - Supplier directory with risk assessments
5. **esg_reports** - Generated compliance reports
6. **data_integrations** - Connected data sources
7. **audit_logs** - Activity tracking

## How to Apply the Migration

### Option 1: Supabase Dashboard (Easiest)

1. Visit: https://app.supabase.com/project/vasoqhufojioslmultco/sql/new
2. Open `supabase/migrations/20260102170000_esg_tables.sql`
3. Copy the entire SQL content
4. Paste into the SQL Editor
5. Click "Run"
6. Verify tables were created in the Table Editor

### Option 2: Supabase CLI (After fixing Command Line Tools)

```bash
# Update Command Line Tools
sudo rm -rf /Library/Developer/CommandLineTools
sudo xcode-select --install

# Install Supabase CLI
brew install supabase/tap/supabase

# Link project
cd /Users/vishale/cyrax-esg-agent
supabase link --project-ref vasoqhufojioslmultco

# Push migration
supabase db push
```

## Using the Database in Components

### Import Hooks

```typescript
import {
  useEnvironmentalData,
  useSocialData,
  useGovernanceData,
  useSuppliers,
  useESGReports,
  useCreateEnvironmentalData,
  useUpdateEnvironmentalData,
  // ... more hooks
} from '@/integrations/supabase/hooks';
```

### Read Data

```typescript
const MyComponent = () => {
  const { data: profile } = useUserProfile();
  const { data: envData, isLoading, error } = useEnvironmentalData(profile?.id);

  if (isLoading) return <Loader />;
  if (error) return <Error />;

  const latestData = envData?.[0]; // Most recent data

  return (
    <div>
      <p>Total Emissions: {latestData?.total_emissions} tCO2e</p>
    </div>
  );
};
```

### Create Data

```typescript
const CreateDataComponent = () => {
  const { data: profile } = useUserProfile();
  const createEnvData = useCreateEnvironmentalData();

  const handleSubmit = async (formData) => {
    await createEnvData.mutateAsync({
      company_id: profile.id,
      data_source: 'manual',
      reporting_period_start: '2026-01-01',
      reporting_period_end: '2026-01-31',
      scope_1_emissions: 1000,
      scope_2_emissions: 500,
      scope_3_emissions: 2000,
      // ... other fields
    });
  };

  return <form onSubmit={handleSubmit}>...</form>;
};
```

### Update Data

```typescript
const UpdateComponent = () => {
  const updateEnvData = useUpdateEnvironmentalData();

  const handleUpdate = async (id: string) => {
    await updateEnvData.mutateAsync({
      id,
      data: {
        verified: true,
        data_quality_score: 0.95,
      },
    });
  };

  return <button onClick={() => handleUpdate('some-id')}>Verify Data</button>;
};
```

## Row Level Security (RLS)

All tables have RLS enabled to ensure data isolation:

- Users can only view their own company's data
- ESG Managers can create and update data
- Auditors have read-only access
- Suppliers can view limited data

## Data Types

### Enums

```typescript
type DataSourceType = 'erp' | 'tms' | 'data_lake' | 'supplier_platform' | 'manual' | 'api';
type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
type ReportStatus = 'draft' | 'in_progress' | 'completed' | 'published';
type ComplianceFramework = 'gri' | 'tcfd' | 'sasb' | 'csrd' | 'csddd' | 'uk_modern_slavery';
```

## Example: Complete CRUD Operations

```typescript
import {
  useSuppliers,
  useCreateSupplier,
  useUpdateSupplier,
  useDeleteSupplier,
  useUserProfile,
} from '@/integrations/supabase/hooks';

const SuppliersPage = () => {
  const { data: profile } = useUserProfile();
  const { data: suppliers, isLoading } = useSuppliers(profile?.id);
  const createSupplier = useCreateSupplier();
  const updateSupplier = useUpdateSupplier();
  const deleteSupplier = useDeleteSupplier();

  const handleCreate = async () => {
    await createSupplier.mutateAsync({
      company_id: profile.id,
      name: 'Acme Logistics',
      tier: 1,
      country: 'USA',
      industry: 'Transportation',
      overall_risk_score: 'low',
    });
  };

  const handleUpdate = async (id: string) => {
    await updateSupplier.mutateAsync({
      id,
      data: { overall_risk_score: 'medium' },
    });
  };

  const handleDelete = async (id: string) => {
    await deleteSupplier.mutateAsync(id); // Soft delete
  };

  return (
    <div>
      {suppliers?.map(supplier => (
        <div key={supplier.id}>
          <h3>{supplier.name}</h3>
          <p>Risk: {supplier.overall_risk_score}</p>
          <button onClick={() => handleUpdate(supplier.id)}>Update</button>
          <button onClick={() => handleDelete(supplier.id)}>Delete</button>
        </div>
      ))}
      <button onClick={handleCreate}>Add Supplier</button>
    </div>
  );
};
```

## Dashboard Components Updated

The following components now fetch real data:

- `EnvironmentMetrics.tsx` - Uses `useEnvironmentalData`
- `SocialMetrics.tsx` - Uses `useSocialData`
- `GovernanceMetrics.tsx` - Uses `useGovernanceData`

## Testing the Integration

1. Run the migration in Supabase Dashboard
2. Start the dev server: `npm run dev`
3. Navigate to the dashboard
4. Components will show loading states, then real data (or "No data" if empty)
5. Insert test data via SQL Editor or create forms in the UI

## Adding Test Data

Run this SQL in Supabase SQL Editor to add sample data:

```sql
-- Insert test environmental data
INSERT INTO environmental_data (
  company_id,
  data_source,
  reporting_period_start,
  reporting_period_end,
  scope_1_emissions,
  scope_2_emissions,
  scope_3_emissions,
  total_emissions,
  verified
) VALUES (
  (SELECT id FROM profiles LIMIT 1),
  'manual',
  '2026-01-01',
  '2026-01-31',
  1500.00,
  800.00,
  3200.00,
  5500.00,
  true
);
```

## Troubleshooting

### "No data available"
- Check if migration was applied successfully
- Verify user is authenticated
- Check RLS policies allow access
- Add test data to the tables

### "Error loading data"
- Check Supabase connection in `.env`
- Verify environment variables are correct
- Check browser console for specific errors
- Ensure RLS policies permit the query

### TypeScript Errors
- Run `npm install` to ensure types are updated
- Restart TypeScript server in VS Code
- Check import paths are correct

## Next Steps

1. Apply the database migration
2. Create forms for data entry
3. Build data import tools for ERP/TMS integration
4. Add data visualization components
5. Implement reporting workflows
