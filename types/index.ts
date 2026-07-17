// ==========================================
// CORE ENTITIES (Campus Lost & Found)
// ==========================================

export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "security_admin"; // Role/type field with 2-3 values
  isActive: boolean;
}

export interface LostItem {
  id: number;
  title: string;
  description: string;
  locationFound: string;
  reportedBy: number; // User ID
  createdAt: Date;
}

export interface Claim {
  id: number;
  itemId: number;
  claimedBy: number; // User ID
  status: ClaimStatus; // Multi-step status lifecycle
  verifiedAt?: Date;
}

// ==========================================
// ENUMS (At least 1 required)
// ==========================================

// Regular enum for multi-step lifecycle status
export enum ClaimStatus {
  Pending,
  Approved,
  Rejected,
}

// ==========================================
// GENERIC INTERFACES (At least 1 required)
// ==========================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ==========================================
// UTILITY TYPES (At least 2 required)
// ==========================================

// 1. Partial: Ideal for updating item descriptions or statuses
export type ItemUpdate = Partial<LostItem>;

// 2. Omit: Public profile removing sensitive or internal fields
export type PublicUser = Omit<User, "email" | "isActive">;

// 3. Record: Dashboard analytics for system claims
export type ClaimSummaryCount = Record<"pending" | "approved" | "rejected", number>;