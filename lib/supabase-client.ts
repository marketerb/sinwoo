import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Client for browser
export const supabase = createClient(supabaseUrl, supabaseKey);

// Client for server with service role
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

// Types
export interface Portfolio {
  id?: string;
  title: string;
  description: string;
  location: string;
  status: string;
  image_url: string;
  created_at?: string;
  updated_at?: string;
}

export interface History {
  id?: string;
  year: number;
  title: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export interface CompanyInfo {
  id?: string;
  company_name: string;
  phone: string;
  fax?: string;
  email: string;
  address: string;
  business_number?: string;
  description?: string;
  ga_tracking_id?: string;
  kakao_channel?: string;
  created_at?: string;
  updated_at?: string;
}

// Portfolio functions
export async function getPortfolios() {
  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function createPortfolio(portfolio: Portfolio) {
  const { data, error } = await supabase
    .from("portfolios")
    .insert([portfolio])
    .select();
  if (error) throw error;
  return data[0];
}

export async function updatePortfolio(id: string, portfolio: Partial<Portfolio>) {
  const { data, error } = await supabase
    .from("portfolios")
    .update(portfolio)
    .eq("id", id)
    .select();
  if (error) throw error;
  return data[0];
}

export async function deletePortfolio(id: string) {
  const { error } = await supabase.from("portfolios").delete().eq("id", id);
  if (error) throw error;
}

// History functions
export async function getHistory() {
  const { data, error } = await supabase
    .from("history")
    .select("*")
    .order("year", { ascending: false });
  if (error) throw error;
  return data;
}

export async function createHistory(history: History) {
  const { data, error } = await supabase
    .from("history")
    .insert([history])
    .select();
  if (error) throw error;
  return data[0];
}

export async function updateHistory(id: string, history: Partial<History>) {
  const { data, error } = await supabase
    .from("history")
    .update(history)
    .eq("id", id)
    .select();
  if (error) throw error;
  return data[0];
}

export async function deleteHistory(id: string) {
  const { error } = await supabase.from("history").delete().eq("id", id);
  if (error) throw error;
}

// Company Info functions
export async function getCompanyInfo() {
  // Use supabaseAdmin for READ to bypass RLS policies
  const client = serviceRoleKey ? supabaseAdmin : supabase;
  const { data, error } = await client
    .from("company_info")
    .select("*");
  if (error) {
    console.error("[getCompanyInfo] Error:", error);
    throw error;
  }
  // Return first row if exists
  return data && data.length > 0 ? data[0] : null;
}

export async function updateCompanyInfo(companyInfo: Partial<CompanyInfo>) {
  const existing = await getCompanyInfo();

  // Use supabaseAdmin for INSERT/UPDATE to bypass RLS policies
  const client = serviceRoleKey ? supabaseAdmin : supabase;

  if (existing) {
    const { data, error } = await client
      .from("company_info")
      .update(companyInfo)
      .eq("id", existing.id)
      .select();
    if (error) throw error;
    return data && data.length > 0 ? data[0] : existing;
  } else {
    // Insert without specifying id to let DB auto-generate it
    const { data, error } = await client
      .from("company_info")
      .insert([companyInfo as CompanyInfo])
      .select();
    if (error) throw error;
    return data && data.length > 0 ? data[0] : null;
  }
}

// Upload image to Supabase Storage
export async function uploadPortfolioImage(
  file: File,
  bucket: string = "portfolio-images"
) {
  const fileName = `${Date.now()}-${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(fileName);

  return publicUrl;
}
