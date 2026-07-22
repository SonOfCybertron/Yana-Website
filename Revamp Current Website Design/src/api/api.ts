// ─── API SERVICE LAYER ───────────────────────────────────────────────────────
// Set VITE_API_URL in your .env file to point to the PHP backend.
// Example: VITE_API_URL=https://api.yanachemodities.com/api
//
// When the env var is absent (Figma Make preview) the service returns
// the built-in mock data so the UI stays fully interactive.

const BASE_URL = import.meta.env.VITE_API_URL ?? '';

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo_url?: string;
  website?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id?: number | null;
}

export interface EquipmentType {
  id: number;
  name: string;
  slug: string;
}

export interface ProductSpec {
  key: string;
  value: string;
}

export interface ProductDocument {
  title: string;
  doc_type: string;
  file_url: string;
  file_size: string;
  file_format: string;
  published_at: string;
}

export interface Product {
  id: number;
  sku?: string;
  name: string;
  slug: string;
  brand: string;
  brand_slug: string;
  category: string;
  category_slug: string;
  equipment_type?: string;
  description: string;
  tag: string;
  image?: string;
  images?: { url: string; alt_text: string; is_primary: boolean }[];
  specs?: ProductSpec[];
  documents?: ProductDocument[];
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: { total: number; page: number; limit: number; total_pages: number };
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
  image_url?: string;
  features: string[];
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

export interface ResourceDoc {
  id: number;
  title: string;
  type: string;
  file_url: string;
  size: string;
  format: string;
  date: string;
  brand: string;
  brand_slug?: string;
}

export interface ContactDept {
  department: string;
  email: string;
  phone: string;
  description: string;
}

export interface ProductsFilter {
  search?: string;
  brand?: string;
  category?: string;
  type?: string;
  tag?: string;
  page?: number;
  limit?: number;
}

export interface InquiryPayload {
  type: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  address?: string;
  product_id?: number;
  product_name?: string;
  message: string;
  preferred_time?: string;
}

export interface ServiceRequestPayload {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service_type: string;
  concern: string;
}

export interface SupportTicketPayload {
  name: string;
  email: string;
  category: string;
  priority: string;
  description: string;
}

// ─── HTTP HELPER ─────────────────────────────────────────────────────────────

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? `Request failed: ${res.status}`);
  }
  return res.json();
}

function buildQuery(params: Record<string, string | number | undefined>): string {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== '') q.set(k, String(v));
  }
  const s = q.toString();
  return s ? `?${s}` : '';
}

// ─── API IS LIVE CHECK ───────────────────────────────────────────────────────

let _apiAvailable: boolean | null = null;

export async function isApiAvailable(): Promise<boolean> {
  if (_apiAvailable !== null) return _apiAvailable;
  if (!BASE_URL) return (_apiAvailable = false);
  try {
    await fetch(`${BASE_URL}/brands`, { signal: AbortSignal.timeout(3000) });
    return (_apiAvailable = true);
  } catch {
    return (_apiAvailable = false);
  }
}

// ─── PRODUCTS ────────────────────────────────────────────────────────────────

export async function fetchProducts(
  filters: ProductsFilter = {}
): Promise<PaginatedResponse<Product>> {
  const q = buildQuery({
    search:   filters.search,
    brand:    filters.brand,
    category: filters.category,
    type:     filters.type,
    tag:      filters.tag,
    page:     filters.page ?? 1,
    limit:    filters.limit ?? 20,
  });
  return request<PaginatedResponse<Product>>(`/products${q}`);
}

export async function fetchProduct(id: number): Promise<{ data: Product }> {
  return request<{ data: Product }>(`/products/${id}`);
}

// ─── LOOKUP TABLES ───────────────────────────────────────────────────────────

export async function fetchBrands(): Promise<{ data: Brand[] }> {
  return request('/brands');
}

export async function fetchCategories(): Promise<{ data: Category[] }> {
  return request('/categories');
}

export async function fetchEquipmentTypes(): Promise<{ data: EquipmentType[] }> {
  return request('/equipment-types');
}

export async function fetchServices(): Promise<{ data: Service[] }> {
  return request('/services');
}

export async function fetchFaqs(): Promise<{ data: Faq[] }> {
  return request('/faqs');
}

export async function fetchTestimonials(): Promise<{ data: Testimonial[] }> {
  return request('/testimonials');
}

export async function fetchContactDirectory(): Promise<{ data: ContactDept[] }> {
  return request('/contact-directory');
}

// ─── RESOURCES ───────────────────────────────────────────────────────────────

export async function fetchResources(params: {
  search?: string;
  type?: string;
  brand?: string;
  page?: number;
} = {}): Promise<PaginatedResponse<ResourceDoc>> {
  const q = buildQuery(params as Record<string, string | number | undefined>);
  return request<PaginatedResponse<ResourceDoc>>(`/resources${q}`);
}

// ─── FORM SUBMISSIONS ────────────────────────────────────────────────────────

export async function submitInquiry(
  payload: InquiryPayload
): Promise<{ success: boolean; message: string; id: number }> {
  return request('/inquiries', { method: 'POST', body: JSON.stringify(payload) });
}

export async function submitServiceRequest(
  payload: ServiceRequestPayload
): Promise<{ success: boolean; message: string }> {
  return request('/service-requests', { method: 'POST', body: JSON.stringify(payload) });
}

export async function submitSupportTicket(
  payload: SupportTicketPayload
): Promise<{ success: boolean; message: string; ticket_no: string }> {
  return request('/support-tickets', { method: 'POST', body: JSON.stringify(payload) });
}

export async function subscribeCareerNotification(
  email: string
): Promise<{ success: boolean; message: string }> {
  return request('/career-notifications', { method: 'POST', body: JSON.stringify({ email }) });
}
