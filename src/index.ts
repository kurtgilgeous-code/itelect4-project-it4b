import type {
  User,
  Item,
  ApiResponse,
  ItemUpdate,
  PublicUser,
  ClaimSummaryCount,
} from "./types";

// ==========================================
// GENERIC FUNCTIONS
// ==========================================

export function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

export function getById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find((item) => item.id === id);
}

// ==========================================
// TYPESCRIPT VERIFICATION DEMO
// ==========================================

export const sampleUser: User = {
  id: "u1",
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

export const sampleItem: Item = {
  id: "1",
  title: "Hydro Flask Bottle",
  description: "Black 32oz flask left in Room 403.",
  location: "Building A, 4th Floor",
  status: "found",
  dateReported: new Date().toISOString(),
  categoryId: "1",
};

export const userApiResponse: ApiResponse<User> = {
  data: sampleUser,
  status: 200,
};

export const itemPatch: ItemUpdate = { description: "Updated: Found near the projector." };
export const publicProfile: PublicUser = { id: "u1", name: "Juan dela Cruz", role: "student" };
export const dashboardStats: ClaimSummaryCount = { pending: 5, approved: 12, rejected: 2 };