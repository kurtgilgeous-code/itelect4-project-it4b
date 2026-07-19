import { useState } from "react";
import UserCard from "./components/UserCard";
import ItemCard from "./components/ItemCard";
import ClaimBadge from "./components/ClaimBadge";
import { ClaimStatus, type User, type LostItem, type Claim } from "./types/index";

const mockUsers: User[] = [
  {
    id: 1,
    name: "Kurt Andre C. Panganiban",
    email: "kurt@example.com",
    role: "student",
    isActive: true,
  },
  {
    id: 2,
    name: "Toby Olimpo",
    email: "toby@example.com",
    role: "student",
    isActive: true,
  },
  {
    id: 3,
    name: "Jacov Endaya",
    email: "jacov@example.com",
    role: "student",
    isActive: true,
  },
  {
    id: 4,
    name: "Raven Belen",
    email: "raven@example.com",
    role: "security_admin",
    isActive: true,
  },
  {
    id: 5,
    name: "Euclid Yabut",
    email: "euclid@example.com",
    role: "student",
    isActive: true,
  },
];

const mockItems: LostItem[] = [
  {
    id: 101,
    title: "Hydro Flask Bottle",
    description: "Black 32oz flask left near the podium room 403.",
    locationFound: "Building A, 4th Floor",
    reportedBy: 1,
    createdAt: new Date("2026-07-08"),
  },
  {
    id: 102,
    title: "Blue Campus Hoodie",
    description: "Pullover hoodie found beside the library stairs.",
    locationFound: "Library Entrance",
    reportedBy: 2,
    createdAt: new Date("2026-07-09"),
  },
  {
    id: 103,
    title: "Wireless Earbuds",
    description: "Black earbuds with a neon green case.",
    locationFound: "Computer Lab 2",
    reportedBy: 4,
    createdAt: new Date("2026-07-11"),
  },
  {
    id: 104,
    title: "Silver Wristwatch",
    description: "Analog watch left on the cafeteria counter.",
    locationFound: "Campus Cafeteria",
    reportedBy: 5,
    createdAt: new Date("2026-07-12"),
  },
];

const mockClaims: Claim[] = [
  {
    id: 501,
    itemId: 101,
    claimedBy: 1,
    status: ClaimStatus.Pending,
  },
  {
    id: 502,
    itemId: 102,
    claimedBy: 3,
    status: ClaimStatus.Approved,
  },
  {
    id: 503,
    itemId: 103,
    claimedBy: 2,
    status: ClaimStatus.Rejected,
  },
  {
    id: 504,
    itemId: 104,
    claimedBy: 5,
    status: ClaimStatus.Pending,
  },
];

function App() {
  const [selectedUser, setSelectedUser] = useState<User>(mockUsers[0]);
  const [selectedItem, setSelectedItem] = useState<LostItem>(mockItems[0]);

  const handleUserSelect = (user: User) => {
    if (user.id === selectedUser.id) {
      const currentIndex = mockUsers.findIndex((u) => u.id === user.id);
      const nextUser = mockUsers[(currentIndex + 1) % mockUsers.length];
      setSelectedUser(nextUser);
      console.log("Switched to next user:", nextUser.name);
      return;
    }

    setSelectedUser(user);
    console.log("Selected user:", user.name);
  };

  const handleItemSelect = (item: LostItem) => {
    setSelectedItem(item);
    console.log("Selected item:", item.title);
  };

    const getItemClaim = (item: LostItem) => mockClaims.find((claim) => claim.itemId === item.id);
  const getItemStatusLabel = (item: LostItem) => getItemClaim(item)?.status ?? "Unclaimed";
  const statusOrder: Record<string, number> = {
    [ClaimStatus.Pending]: 0,
    [ClaimStatus.Approved]: 1,
    [ClaimStatus.Rejected]: 2,
    Unclaimed: 3,
  };

  const sortedItems = [...mockItems].sort((a, b) => {
    const statusA = getItemStatusLabel(a);
    const statusB = getItemStatusLabel(b);
    return statusOrder[statusA] - statusOrder[statusB] || a.title.localeCompare(b.title);
  });

  const selectedClaim = getItemClaim(selectedItem);
  const foundBy = mockUsers.find((user) => user.id === selectedItem.reportedBy)?.name ?? "Unknown";
  const claimedBy = selectedClaim
    ? mockUsers.find((user) => user.id === selectedClaim.claimedBy)?.name ?? "Unknown"
    : "No claim";

  return (
    <div className="app-shell">
      <header className="hero">
        <h1>Campus Lost & Found</h1>
        <p className="subtitle">8-bit dashboard for item recovery and claim tracking</p>
      </header>

      <section className="section-grid">
        <div className="section-card">
          <h2>Available Users</h2>
          <div className="user-list">
            {mockUsers.map((user) => (
              <button
                key={user.id}
                className={`pill ${selectedUser.id === user.id ? "active" : ""}`}
                onClick={() => handleUserSelect(user)}
              >
                {user.name}
              </button>
            ))}
          </div>
        </div>

        <div className="section-card">
          <h2>Available Items</h2>
          <div className="item-list">
            {sortedItems.map((item) => {
              const statusLabel = getItemStatusLabel(item);
              return (
                <button
                  key={item.id}
                  className={`pill ${selectedItem.id === item.id ? "active" : ""}`}
                  onClick={() => handleItemSelect(item)}
                >
                  {item.title}
                  <span className={`status-pill ${statusLabel.toLowerCase().replace(/\s+/g, "-")}`}>
                    {statusLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="section-card">
          <h2>User Account</h2>
          <UserCard user={selectedUser} onSelect={handleUserSelect} />
        </div>

        <div className="section-card">
          <h2>Discovered Item</h2>
          <ItemCard item={selectedItem} foundBy={foundBy} statusLabel={selectedClaim?.status ?? "Unclaimed"} />
        </div>

        <div className="section-card full-width">
          <h2>Claim Summary</h2>
          <ClaimBadge claim={selectedClaim} claimedBy={claimedBy} />
        </div>
      </section>
    </div>
  );
}

export default App;