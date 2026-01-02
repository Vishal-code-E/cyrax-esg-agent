import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../client";
import type { Tables, TablesInsert, TablesUpdate } from "../types";

// Environmental Data Hooks
export const useEnvironmentalData = (companyId?: string) => {
  return useQuery({
    queryKey: ["environmental-data", companyId],
    queryFn: async () => {
      let query = supabase
        .from("environmental_data")
        .select("*")
        .order("reporting_period_start", { ascending: false });
      
      if (companyId) {
        query = query.eq("company_id", companyId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Tables<"environmental_data">[];
    },
    enabled: !!companyId,
  });
};

export const useCreateEnvironmentalData = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: TablesInsert<"environmental_data">) => {
      const { data: result, error } = await supabase
        .from("environmental_data")
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["environmental-data"] });
    },
  });
};

export const useUpdateEnvironmentalData = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TablesUpdate<"environmental_data"> }) => {
      const { data: result, error } = await supabase
        .from("environmental_data")
        .update(data)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["environmental-data"] });
    },
  });
};

// Social Data Hooks
export const useSocialData = (companyId?: string) => {
  return useQuery({
    queryKey: ["social-data", companyId],
    queryFn: async () => {
      let query = supabase
        .from("social_data")
        .select("*")
        .order("reporting_period_start", { ascending: false });
      
      if (companyId) {
        query = query.eq("company_id", companyId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Tables<"social_data">[];
    },
    enabled: !!companyId,
  });
};

export const useCreateSocialData = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: TablesInsert<"social_data">) => {
      const { data: result, error } = await supabase
        .from("social_data")
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-data"] });
    },
  });
};

export const useUpdateSocialData = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TablesUpdate<"social_data"> }) => {
      const { data: result, error } = await supabase
        .from("social_data")
        .update(data)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-data"] });
    },
  });
};

// Governance Data Hooks
export const useGovernanceData = (companyId?: string) => {
  return useQuery({
    queryKey: ["governance-data", companyId],
    queryFn: async () => {
      let query = supabase
        .from("governance_data")
        .select("*")
        .order("reporting_period_start", { ascending: false });
      
      if (companyId) {
        query = query.eq("company_id", companyId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Tables<"governance_data">[];
    },
    enabled: !!companyId,
  });
};

export const useCreateGovernanceData = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: TablesInsert<"governance_data">) => {
      const { data: result, error } = await supabase
        .from("governance_data")
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["governance-data"] });
    },
  });
};

export const useUpdateGovernanceData = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TablesUpdate<"governance_data"> }) => {
      const { data: result, error } = await supabase
        .from("governance_data")
        .update(data)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["governance-data"] });
    },
  });
};

// Suppliers Hooks
export const useSuppliers = (companyId?: string) => {
  return useQuery({
    queryKey: ["suppliers", companyId],
    queryFn: async () => {
      let query = supabase
        .from("suppliers")
        .select("*")
        .eq("active", true)
        .order("name", { ascending: true });
      
      if (companyId) {
        query = query.eq("company_id", companyId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Tables<"suppliers">[];
    },
    enabled: !!companyId,
  });
};

export const useCreateSupplier = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: TablesInsert<"suppliers">) => {
      const { data: result, error } = await supabase
        .from("suppliers")
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });
};

export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TablesUpdate<"suppliers"> }) => {
      const { data: result, error } = await supabase
        .from("suppliers")
        .update(data)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });
};

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      // Soft delete by setting active to false
      const { data, error } = await supabase
        .from("suppliers")
        .update({ active: false })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });
};

// ESG Reports Hooks
export const useESGReports = (companyId?: string) => {
  return useQuery({
    queryKey: ["esg-reports", companyId],
    queryFn: async () => {
      let query = supabase
        .from("esg_reports")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (companyId) {
        query = query.eq("company_id", companyId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Tables<"esg_reports">[];
    },
    enabled: !!companyId,
  });
};

export const useCreateESGReport = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: TablesInsert<"esg_reports">) => {
      const { data: result, error } = await supabase
        .from("esg_reports")
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["esg-reports"] });
    },
  });
};

export const useUpdateESGReport = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TablesUpdate<"esg_reports"> }) => {
      const { data: result, error } = await supabase
        .from("esg_reports")
        .update(data)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["esg-reports"] });
    },
  });
};

// Data Integrations Hooks
export const useDataIntegrations = (companyId?: string) => {
  return useQuery({
    queryKey: ["data-integrations", companyId],
    queryFn: async () => {
      let query = supabase
        .from("data_integrations")
        .select("*")
        .order("name", { ascending: true });
      
      if (companyId) {
        query = query.eq("company_id", companyId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Tables<"data_integrations">[];
    },
    enabled: !!companyId,
  });
};

export const useCreateDataIntegration = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: TablesInsert<"data_integrations">) => {
      const { data: result, error } = await supabase
        .from("data_integrations")
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data-integrations"] });
    },
  });
};

export const useUpdateDataIntegration = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TablesUpdate<"data_integrations"> }) => {
      const { data: result, error } = await supabase
        .from("data_integrations")
        .update(data)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data-integrations"] });
    },
  });
};

// User Profile Hook
export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      
      if (error) throw error;
      return data as Tables<"profiles">;
    },
  });
};

// Audit Logs Hook
export const useAuditLogs = (companyId?: string) => {
  return useQuery({
    queryKey: ["audit-logs", companyId],
    queryFn: async () => {
      let query = supabase
        .from("audit_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      
      if (companyId) {
        query = query.eq("company_id", companyId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Tables<"audit_logs">[];
    },
    enabled: !!companyId,
  });
};
