export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          id: string
          company_id: string | null
          user_id: string | null
          action: string
          entity_type: string
          entity_id: string | null
          changes: Json | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          company_id?: string | null
          user_id?: string | null
          action: string
          entity_type: string
          entity_id?: string | null
          changes?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          company_id?: string | null
          user_id?: string | null
          action?: string
          entity_type?: string
          entity_id?: string | null
          changes?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Relationships: []
      }
      data_integrations: {
        Row: {
          id: string
          company_id: string
          name: string
          source_type: Database["public"]["Enums"]["data_source_type"]
          connection_config: Json | null
          api_endpoint: string | null
          active: boolean
          last_sync_at: string | null
          last_sync_status: string | null
          sync_frequency: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          name: string
          source_type: Database["public"]["Enums"]["data_source_type"]
          connection_config?: Json | null
          api_endpoint?: string | null
          active?: boolean
          last_sync_at?: string | null
          last_sync_status?: string | null
          sync_frequency?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          name?: string
          source_type?: Database["public"]["Enums"]["data_source_type"]
          connection_config?: Json | null
          api_endpoint?: string | null
          active?: boolean
          last_sync_at?: string | null
          last_sync_status?: string | null
          sync_frequency?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      environmental_data: {
        Row: {
          id: string
          company_id: string
          data_source: Database["public"]["Enums"]["data_source_type"]
          reporting_period_start: string
          reporting_period_end: string
          scope_1_emissions: number | null
          scope_2_emissions: number | null
          scope_3_emissions: number | null
          total_emissions: number | null
          fuel_consumption: number | null
          electricity_consumption: number | null
          renewable_energy_percentage: number | null
          total_vehicles: number | null
          ev_vehicles: number | null
          ice_vehicles: number | null
          route_efficiency_score: number | null
          warehouse_energy_kwh: number | null
          packaging_waste_tons: number | null
          recycling_rate_percentage: number | null
          data_quality_score: number | null
          verified: boolean
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          company_id: string
          data_source: Database["public"]["Enums"]["data_source_type"]
          reporting_period_start: string
          reporting_period_end: string
          scope_1_emissions?: number | null
          scope_2_emissions?: number | null
          scope_3_emissions?: number | null
          total_emissions?: number | null
          fuel_consumption?: number | null
          electricity_consumption?: number | null
          renewable_energy_percentage?: number | null
          total_vehicles?: number | null
          ev_vehicles?: number | null
          ice_vehicles?: number | null
          route_efficiency_score?: number | null
          warehouse_energy_kwh?: number | null
          packaging_waste_tons?: number | null
          recycling_rate_percentage?: number | null
          data_quality_score?: number | null
          verified?: boolean
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          company_id?: string
          data_source?: Database["public"]["Enums"]["data_source_type"]
          reporting_period_start?: string
          reporting_period_end?: string
          scope_1_emissions?: number | null
          scope_2_emissions?: number | null
          scope_3_emissions?: number | null
          total_emissions?: number | null
          fuel_consumption?: number | null
          electricity_consumption?: number | null
          renewable_energy_percentage?: number | null
          total_vehicles?: number | null
          ev_vehicles?: number | null
          ice_vehicles?: number | null
          route_efficiency_score?: number | null
          warehouse_energy_kwh?: number | null
          packaging_waste_tons?: number | null
          recycling_rate_percentage?: number | null
          data_quality_score?: number | null
          verified?: boolean
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Relationships: []
      }
      esg_reports: {
        Row: {
          id: string
          company_id: string
          title: string
          framework: Database["public"]["Enums"]["compliance_framework"]
          reporting_period_start: string
          reporting_period_end: string
          status: Database["public"]["Enums"]["report_status"]
          executive_summary: string | null
          report_data: Json | null
          file_url: string | null
          file_type: string | null
          generated_at: string | null
          published_at: string | null
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          company_id: string
          title: string
          framework: Database["public"]["Enums"]["compliance_framework"]
          reporting_period_start: string
          reporting_period_end: string
          status?: Database["public"]["Enums"]["report_status"]
          executive_summary?: string | null
          report_data?: Json | null
          file_url?: string | null
          file_type?: string | null
          generated_at?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          company_id?: string
          title?: string
          framework?: Database["public"]["Enums"]["compliance_framework"]
          reporting_period_start?: string
          reporting_period_end?: string
          status?: Database["public"]["Enums"]["report_status"]
          executive_summary?: string | null
          report_data?: Json | null
          file_url?: string | null
          file_type?: string | null
          generated_at?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Relationships: []
      }
      governance_data: {
        Row: {
          id: string
          company_id: string
          data_source: Database["public"]["Enums"]["data_source_type"]
          reporting_period_start: string
          reporting_period_end: string
          board_esg_oversight: boolean | null
          esg_committee_exists: boolean | null
          independent_directors_percentage: number | null
          ethics_policy_updated_date: string | null
          code_of_conduct_violations: number | null
          corruption_incidents: number | null
          anti_bribery_training_completed: number | null
          supplier_contracts_reviewed: number | null
          supplier_contracts_compliant: number | null
          supplier_risk_assessments_completed: number | null
          internal_audits_completed: number | null
          external_audits_completed: number | null
          audit_findings: number | null
          findings_remediated: number | null
          cybersecurity_incidents: number | null
          data_breaches: number | null
          security_training_completion_percentage: number | null
          regulatory_violations: number | null
          fines_paid: number | null
          data_quality_score: number | null
          verified: boolean
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          company_id: string
          data_source: Database["public"]["Enums"]["data_source_type"]
          reporting_period_start: string
          reporting_period_end: string
          board_esg_oversight?: boolean | null
          esg_committee_exists?: boolean | null
          independent_directors_percentage?: number | null
          ethics_policy_updated_date?: string | null
          code_of_conduct_violations?: number | null
          corruption_incidents?: number | null
          anti_bribery_training_completed?: number | null
          supplier_contracts_reviewed?: number | null
          supplier_contracts_compliant?: number | null
          supplier_risk_assessments_completed?: number | null
          internal_audits_completed?: number | null
          external_audits_completed?: number | null
          audit_findings?: number | null
          findings_remediated?: number | null
          cybersecurity_incidents?: number | null
          data_breaches?: number | null
          security_training_completion_percentage?: number | null
          regulatory_violations?: number | null
          fines_paid?: number | null
          data_quality_score?: number | null
          verified?: boolean
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          company_id?: string
          data_source?: Database["public"]["Enums"]["data_source_type"]
          reporting_period_start?: string
          reporting_period_end?: string
          board_esg_oversight?: boolean | null
          esg_committee_exists?: boolean | null
          independent_directors_percentage?: number | null
          ethics_policy_updated_date?: string | null
          code_of_conduct_violations?: number | null
          corruption_incidents?: number | null
          anti_bribery_training_completed?: number | null
          supplier_contracts_reviewed?: number | null
          supplier_contracts_compliant?: number | null
          supplier_risk_assessments_completed?: number | null
          internal_audits_completed?: number | null
          external_audits_completed?: number | null
          audit_findings?: number | null
          findings_remediated?: number | null
          cybersecurity_incidents?: number | null
          data_breaches?: number | null
          security_training_completion_percentage?: number | null
          regulatory_violations?: number | null
          fines_paid?: number | null
          data_quality_score?: number | null
          verified?: boolean
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_name: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      social_data: {
        Row: {
          id: string
          company_id: string
          data_source: Database["public"]["Enums"]["data_source_type"]
          reporting_period_start: string
          reporting_period_end: string
          total_incidents: number | null
          lost_time_incidents: number | null
          incident_rate: number | null
          safety_training_hours: number | null
          total_employees: number | null
          training_hours_per_employee: number | null
          average_wage: number | null
          wage_compliance_percentage: number | null
          forced_labor_risk_score: Database["public"]["Enums"]["risk_level"] | null
          child_labor_risk_score: Database["public"]["Enums"]["risk_level"] | null
          supplier_audits_completed: number | null
          grievances_reported: number | null
          grievances_resolved: number | null
          female_employees_percentage: number | null
          leadership_diversity_percentage: number | null
          data_quality_score: number | null
          verified: boolean
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          company_id: string
          data_source: Database["public"]["Enums"]["data_source_type"]
          reporting_period_start: string
          reporting_period_end: string
          total_incidents?: number | null
          lost_time_incidents?: number | null
          incident_rate?: number | null
          safety_training_hours?: number | null
          total_employees?: number | null
          training_hours_per_employee?: number | null
          average_wage?: number | null
          wage_compliance_percentage?: number | null
          forced_labor_risk_score?: Database["public"]["Enums"]["risk_level"] | null
          child_labor_risk_score?: Database["public"]["Enums"]["risk_level"] | null
          supplier_audits_completed?: number | null
          grievances_reported?: number | null
          grievances_resolved?: number | null
          female_employees_percentage?: number | null
          leadership_diversity_percentage?: number | null
          data_quality_score?: number | null
          verified?: boolean
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          company_id?: string
          data_source?: Database["public"]["Enums"]["data_source_type"]
          reporting_period_start?: string
          reporting_period_end?: string
          total_incidents?: number | null
          lost_time_incidents?: number | null
          incident_rate?: number | null
          safety_training_hours?: number | null
          total_employees?: number | null
          training_hours_per_employee?: number | null
          average_wage?: number | null
          wage_compliance_percentage?: number | null
          forced_labor_risk_score?: Database["public"]["Enums"]["risk_level"] | null
          child_labor_risk_score?: Database["public"]["Enums"]["risk_level"] | null
          supplier_audits_completed?: number | null
          grievances_reported?: number | null
          grievances_resolved?: number | null
          female_employees_percentage?: number | null
          leadership_diversity_percentage?: number | null
          data_quality_score?: number | null
          verified?: boolean
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          id: string
          company_id: string
          name: string
          tier: number
          country: string | null
          industry: string | null
          overall_risk_score: Database["public"]["Enums"]["risk_level"] | null
          environmental_risk_score: Database["public"]["Enums"]["risk_level"] | null
          social_risk_score: Database["public"]["Enums"]["risk_level"] | null
          governance_risk_score: Database["public"]["Enums"]["risk_level"] | null
          last_audit_date: string | null
          next_audit_date: string | null
          certifications: Json | null
          contact_email: string | null
          contact_phone: string | null
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          name: string
          tier: number
          country?: string | null
          industry?: string | null
          overall_risk_score?: Database["public"]["Enums"]["risk_level"] | null
          environmental_risk_score?: Database["public"]["Enums"]["risk_level"] | null
          social_risk_score?: Database["public"]["Enums"]["risk_level"] | null
          governance_risk_score?: Database["public"]["Enums"]["risk_level"] | null
          last_audit_date?: string | null
          next_audit_date?: string | null
          certifications?: Json | null
          contact_email?: string | null
          contact_phone?: string | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          name?: string
          tier?: number
          country?: string | null
          industry?: string | null
          overall_risk_score?: Database["public"]["Enums"]["risk_level"] | null
          environmental_risk_score?: Database["public"]["Enums"]["risk_level"] | null
          social_risk_score?: Database["public"]["Enums"]["risk_level"] | null
          governance_risk_score?: Database["public"]["Enums"]["risk_level"] | null
          last_audit_date?: string | null
          next_audit_date?: string | null
          certifications?: Json | null
          contact_email?: string | null
          contact_phone?: string | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "esg_manager" | "auditor" | "supplier"
      compliance_framework: "gri" | "tcfd" | "sasb" | "csrd" | "csddd" | "uk_modern_slavery"
      data_source_type: "erp" | "tms" | "data_lake" | "supplier_platform" | "manual" | "api"
      esg_pillar: "environmental" | "social" | "governance"
      report_status: "draft" | "in_progress" | "completed" | "published"
      risk_level: "low" | "medium" | "high" | "critical"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["esg_manager", "auditor", "supplier"],
      compliance_framework: ["gri", "tcfd", "sasb", "csrd", "csddd", "uk_modern_slavery"],
      data_source_type: ["erp", "tms", "data_lake", "supplier_platform", "manual", "api"],
      esg_pillar: ["environmental", "social", "governance"],
      report_status: ["draft", "in_progress", "completed", "published"],
      risk_level: ["low", "medium", "high", "critical"],
    },
  },
} as const
