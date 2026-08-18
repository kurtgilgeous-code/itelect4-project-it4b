// ==========================================
// CORE ENTITIES (Campus Lost & Found Tracker)
// ==========================================

export interface Item {
  id: string;
  title: string;
  description: string;
  location: string;
  status: 'lost' | 'found' | 'claimed';
  dateReported: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Claim {
  id: string;
  itemId: string;
  claimantName: string;
  claimDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  isActive: boolean;
}

// ==========================================
// CREATION/MUTATION TYPES (using Omit for auto-generated fields)
// ==========================================

export type ItemCreateInput = Omit<Item, 'id'>;
export type ItemUpdateInput = Partial<ItemCreateInput>;
export type ClaimCreateInput = Omit<Claim, 'id'>;
export type ClaimUpdateInput = Partial<ClaimCreateInput>;

// ==========================================
// API RESPONSE TYPES
// ==========================================

export interface ApiResponse<T> {
  data: T;
  status: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// ==========================================
// UTILITY TYPES
// ==========================================

// 1. Partial: Ideal for updating item descriptions or statuses
export type ItemUpdate = Partial<Item>;

// 2. Omit: Public profile removing sensitive or internal fields
export type PublicUser = Omit<User, 'email' | 'isActive'>;

// 3. Record: Dashboard analytics for system claims
export type ClaimSummaryCount = Record<'pending' | 'approved' | 'rejected', number>;