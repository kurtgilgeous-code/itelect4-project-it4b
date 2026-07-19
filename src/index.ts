import { ClaimStatus } from "./types/index";
import type {
  User,
  LostItem,
  ApiResponse,
  ItemUpdate,
  PublicUser,
  ClaimSummaryCount,
} from "./types/index";

// ==========================================
// GENERIC FUNCTIONS (At least 1 required)
// ==========================================

// Generic function to fetch the first element safely
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

// Constrained generic function requiring an 'id' property
function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

// ==========================================
// MOCK DATA & IMPLEMENTATION DEMO
// ==========================================

const mockUser: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const mockItem: LostItem = {
  id: 101,
  title: "Hydro Flask Bottle",
  description: "Black 32oz flask left in Room 403.",
  locationFound: "Building A, 4th Floor",
  reportedBy: 1,
  createdAt: new Date(),
};

// Testing Generics
const firstItem = getFirst<LostItem>([mockItem]);
const foundUser = getById<User>([mockUser], 1);

console.log(`First Item Title: ${firstItem?.title}`);
console.log(`Found User Email: ${foundUser?.email}`);

// Generic API Responses
const userApiResponse: ApiResponse<User> = {
  success: true,
  data: mockUser,
};
console.log("User API response:", userApiResponse);

// Testing Utility Types
const itemPatch: ItemUpdate = { description: "Updated: Found near the projector." };
const publicProfile: PublicUser = { id: 1, name: "Juan dela Cruz", role: "student" };
const dashboardStats: ClaimSummaryCount = { pending: 5, approved: 12, rejected: 2 };
console.log("Patch payload:", itemPatch);
console.log("Public profile:", publicProfile);
console.log("Dashboard stats:", dashboardStats);

// Testing Enums
let currentClaimStatus: ClaimStatus = ClaimStatus.Pending;
console.log(`Initial Claim Status: ${ClaimStatus[currentClaimStatus]}`); // "Pending"