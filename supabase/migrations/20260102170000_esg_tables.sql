-- ESG Data Tables for CYRAX Platform

-- Create enum types for ESG data
CREATE TYPE public.esg_pillar AS ENUM ('environmental', 'social', 'governance');
CREATE TYPE public.data_source_type AS ENUM ('erp', 'tms', 'data_lake', 'supplier_platform', 'manual', 'api');
CREATE TYPE public.report_status AS ENUM ('draft', 'in_progress', 'completed', 'published');
CREATE TYPE public.compliance_framework AS ENUM ('gri', 'tcfd', 'sasb', 'csrd', 'csddd', 'uk_modern_slavery');
CREATE TYPE public.risk_level AS ENUM ('low', 'medium', 'high', 'critical');

-- Environmental data table
CREATE TABLE public.environmental_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  data_source data_source_type NOT NULL,
  reporting_period_start DATE NOT NULL,
  reporting_period_end DATE NOT NULL,
  
  -- Emissions data
  scope_1_emissions DECIMAL(15, 2),
  scope_2_emissions DECIMAL(15, 2),
  scope_3_emissions DECIMAL(15, 2),
  total_emissions DECIMAL(15, 2),
  
  -- Energy data
  fuel_consumption DECIMAL(15, 2),
  electricity_consumption DECIMAL(15, 2),
  renewable_energy_percentage DECIMAL(5, 2),
  
  -- Fleet data
  total_vehicles INTEGER,
  ev_vehicles INTEGER,
  ice_vehicles INTEGER,
  route_efficiency_score DECIMAL(5, 2),
  
  -- Warehouse data
  warehouse_energy_kwh DECIMAL(15, 2),
  
  -- Waste data
  packaging_waste_tons DECIMAL(10, 2),
  recycling_rate_percentage DECIMAL(5, 2),
  
  -- Metadata
  data_quality_score DECIMAL(3, 2),
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Social data table
CREATE TABLE public.social_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  data_source data_source_type NOT NULL,
  reporting_period_start DATE NOT NULL,
  reporting_period_end DATE NOT NULL,
  
  -- Health & Safety
  total_incidents INTEGER,
  lost_time_incidents INTEGER,
  incident_rate DECIMAL(5, 2),
  safety_training_hours INTEGER,
  
  -- Labor & Employment
  total_employees INTEGER,
  training_hours_per_employee DECIMAL(10, 2),
  average_wage DECIMAL(15, 2),
  wage_compliance_percentage DECIMAL(5, 2),
  
  -- Human Rights
  forced_labor_risk_score risk_level,
  child_labor_risk_score risk_level,
  supplier_audits_completed INTEGER,
  grievances_reported INTEGER,
  grievances_resolved INTEGER,
  
  -- Diversity & Inclusion
  female_employees_percentage DECIMAL(5, 2),
  leadership_diversity_percentage DECIMAL(5, 2),
  
  -- Metadata
  data_quality_score DECIMAL(3, 2),
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Governance data table
CREATE TABLE public.governance_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  data_source data_source_type NOT NULL,
  reporting_period_start DATE NOT NULL,
  reporting_period_end DATE NOT NULL,
  
  -- Board & Oversight
  board_esg_oversight BOOLEAN,
  esg_committee_exists BOOLEAN,
  independent_directors_percentage DECIMAL(5, 2),
  
  -- Ethics & Compliance
  ethics_policy_updated_date DATE,
  code_of_conduct_violations INTEGER,
  corruption_incidents INTEGER,
  anti_bribery_training_completed INTEGER,
  
  -- Supply Chain Governance
  supplier_contracts_reviewed INTEGER,
  supplier_contracts_compliant INTEGER,
  supplier_risk_assessments_completed INTEGER,
  
  -- Audit & Remediation
  internal_audits_completed INTEGER,
  external_audits_completed INTEGER,
  audit_findings INTEGER,
  findings_remediated INTEGER,
  
  -- Cybersecurity
  cybersecurity_incidents INTEGER,
  data_breaches INTEGER,
  security_training_completion_percentage DECIMAL(5, 2),
  
  -- Regulatory
  regulatory_violations INTEGER,
  fines_paid DECIMAL(15, 2),
  
  -- Metadata
  data_quality_score DECIMAL(3, 2),
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Suppliers table
CREATE TABLE public.suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  tier INTEGER NOT NULL CHECK (tier >= 1 AND tier <= 10),
  country TEXT,
  industry TEXT,
  
  -- Risk Assessment
  overall_risk_score risk_level,
  environmental_risk_score risk_level,
  social_risk_score risk_level,
  governance_risk_score risk_level,
  
  -- Compliance
  last_audit_date DATE,
  next_audit_date DATE,
  certifications JSONB,
  
  -- Contact
  contact_email TEXT,
  contact_phone TEXT,
  
  -- Metadata
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ESG Reports table
CREATE TABLE public.esg_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  framework compliance_framework NOT NULL,
  reporting_period_start DATE NOT NULL,
  reporting_period_end DATE NOT NULL,
  status report_status NOT NULL DEFAULT 'draft',
  
  -- Report content
  executive_summary TEXT,
  report_data JSONB,
  file_url TEXT,
  file_type TEXT,
  
  -- Metadata
  generated_at TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Data integrations table
CREATE TABLE public.data_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  source_type data_source_type NOT NULL,
  
  -- Connection details
  connection_config JSONB,
  api_endpoint TEXT,
  
  -- Status
  active BOOLEAN DEFAULT true,
  last_sync_at TIMESTAMP WITH TIME ZONE,
  last_sync_status TEXT,
  sync_frequency TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Audit logs table
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  changes JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.environmental_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.governance_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esg_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Environmental Data
CREATE POLICY "Users can view their company's environmental data"
  ON public.environmental_data FOR SELECT
  USING (
    company_id IN (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "ESG Managers can insert environmental data"
  ON public.environmental_data FOR INSERT
  WITH CHECK (
    company_id IN (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
    AND public.has_role(auth.uid(), 'esg_manager')
  );

CREATE POLICY "ESG Managers can update environmental data"
  ON public.environmental_data FOR UPDATE
  USING (
    company_id IN (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
    AND public.has_role(auth.uid(), 'esg_manager')
  );

-- RLS Policies for Social Data
CREATE POLICY "Users can view their company's social data"
  ON public.social_data FOR SELECT
  USING (
    company_id IN (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "ESG Managers can insert social data"
  ON public.social_data FOR INSERT
  WITH CHECK (
    company_id IN (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
    AND public.has_role(auth.uid(), 'esg_manager')
  );

CREATE POLICY "ESG Managers can update social data"
  ON public.social_data FOR UPDATE
  USING (
    company_id IN (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
    AND public.has_role(auth.uid(), 'esg_manager')
  );

-- RLS Policies for Governance Data
CREATE POLICY "Users can view their company's governance data"
  ON public.governance_data FOR SELECT
  USING (
    company_id IN (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "ESG Managers can insert governance data"
  ON public.governance_data FOR INSERT
  WITH CHECK (
    company_id IN (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
    AND public.has_role(auth.uid(), 'esg_manager')
  );

CREATE POLICY "ESG Managers can update governance data"
  ON public.governance_data FOR UPDATE
  USING (
    company_id IN (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
    AND public.has_role(auth.uid(), 'esg_manager')
  );

-- RLS Policies for Suppliers
CREATE POLICY "Users can view their company's suppliers"
  ON public.suppliers FOR SELECT
  USING (
    company_id IN (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "ESG Managers can manage suppliers"
  ON public.suppliers FOR ALL
  USING (
    company_id IN (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
    AND public.has_role(auth.uid(), 'esg_manager')
  );

-- RLS Policies for ESG Reports
CREATE POLICY "Users can view their company's reports"
  ON public.esg_reports FOR SELECT
  USING (
    company_id IN (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "ESG Managers can manage reports"
  ON public.esg_reports FOR ALL
  USING (
    company_id IN (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
    AND public.has_role(auth.uid(), 'esg_manager')
  );

-- RLS Policies for Data Integrations
CREATE POLICY "Users can view their company's integrations"
  ON public.data_integrations FOR SELECT
  USING (
    company_id IN (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "ESG Managers can manage integrations"
  ON public.data_integrations FOR ALL
  USING (
    company_id IN (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
    AND public.has_role(auth.uid(), 'esg_manager')
  );

-- RLS Policies for Audit Logs
CREATE POLICY "Users can view their company's audit logs"
  ON public.audit_logs FOR SELECT
  USING (
    company_id IN (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
  );

-- Triggers for updated_at
CREATE TRIGGER update_environmental_data_updated_at
  BEFORE UPDATE ON public.environmental_data
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_social_data_updated_at
  BEFORE UPDATE ON public.social_data
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_governance_data_updated_at
  BEFORE UPDATE ON public.governance_data
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_suppliers_updated_at
  BEFORE UPDATE ON public.suppliers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_esg_reports_updated_at
  BEFORE UPDATE ON public.esg_reports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_data_integrations_updated_at
  BEFORE UPDATE ON public.data_integrations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_environmental_data_company ON public.environmental_data(company_id);
CREATE INDEX idx_environmental_data_period ON public.environmental_data(reporting_period_start, reporting_period_end);
CREATE INDEX idx_social_data_company ON public.social_data(company_id);
CREATE INDEX idx_social_data_period ON public.social_data(reporting_period_start, reporting_period_end);
CREATE INDEX idx_governance_data_company ON public.governance_data(company_id);
CREATE INDEX idx_governance_data_period ON public.governance_data(reporting_period_start, reporting_period_end);
CREATE INDEX idx_suppliers_company ON public.suppliers(company_id);
CREATE INDEX idx_suppliers_risk ON public.suppliers(overall_risk_score);
CREATE INDEX idx_esg_reports_company ON public.esg_reports(company_id);
CREATE INDEX idx_esg_reports_status ON public.esg_reports(status);
CREATE INDEX idx_audit_logs_company ON public.audit_logs(company_id);
CREATE INDEX idx_audit_logs_created ON public.audit_logs(created_at);
