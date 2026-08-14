import type { User, LostItem, Claim } from "../types/index";
import { ClaimStatus } from "../types/index";

export const mockUser: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

export const initialItems: LostItem[] = [
  {
    id: 101,
    title: "Hydro Flask Bottle",
    description: "Black 32oz flask left in Room 403.",
    locationFound: "Building A, 4th Floor",
    reportedBy: 1,
    createdAt: new Date(),
  },
  {
    id: 102,
    title: "Graphing Calculator",
    description: "TI-84 Plus left on the library table.",
    locationFound: "Main Library",
    reportedBy: 1,
    createdAt: new Date(),
  },
];

export const mockClaim: Claim = {
  id: 501,
  itemId: 101,
  claimedBy: 1,
  status: ClaimStatus.Pending,
};
