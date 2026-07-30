import { useState, useEffect, useRef } from "react";
import type React from "react";
import type { User, LostItem, Claim } from "./types/index";
import { ClaimStatus } from "./types/index";
import UserCard from "./components/UserCard";
import ItemCard from "./components/ItemCard";
import ClaimBadge from "./components/ClaimBadge";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

// Mock Data Source
const mockUser: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const initialItems: LostItem[] = [
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

const mockClaim: Claim = {
  id: 501,
  itemId: 101,
  claimedBy: 1,
  status: ClaimStatus.Pending,
};

function App() {
  // 1. useState<T> for dynamic state pieces
  const [items, setItems] = useState<LostItem[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // 2. Custom hooks
  const [showAdminPanel, toggleAdminPanel] = useToggle(false);
  const previousSearch = usePrevious<string>(searchTerm);

  // 3. useRef for DOM element targeting
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 4. useEffect to load mock data asynchronously on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(initialItems);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // Programmatically focus the search input
  const handleFocusSearch = (): void => {
    searchInputRef.current?.focus();
  };

  // 5. Typed event handler for text inputs
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  // Derived filtered items based on typed state
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div style={{ padding: "24px", fontFamily: "sans-serif" }}>
        <p>🔄 Loading Campus Tracker items...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: "600px" }}>
      <h1>Campus Lost & Found Tracker</h1>
      <hr />

      {/* Controls & Search Section */}
      <div style={{ marginBottom: "16px" }}>
        <input
          ref={searchInputRef}
          type="text"
          value={searchTerm}
          placeholder="Search items by title..."
          onChange={handleSearchChange}
          style={{ padding: "8px", width: "70%", marginRight: "8px" }}
        />
        <button onClick={handleFocusSearch}>Focus Search</button>
      </div>

      {previousSearch !== undefined && previousSearch !== searchTerm && (
        <p style={{ fontSize: "0.85rem", color: "#666" }}>
          Last search term: <em>"{previousSearch}"</em>
        </p>
      )}

      {/* Custom Hook Toggle Section */}
      <div style={{ margin: "16px 0" }}>
        <button onClick={toggleAdminPanel}>
          {showAdminPanel ? "Hide Admin Controls" : "Show Admin Controls"}
        </button>
        {showAdminPanel && (
          <div style={{ marginTop: "8px", padding: "8px", background: "#f0f0f0" }}>
            <p><strong>Admin Panel Active:</strong> System status is healthy.</p>
          </div>
        )}
      </div>

      {/* Render Dynamic State */}
      <h2>User Profile</h2>
      <UserCard user={mockUser} onSelect={setSelectedUser} />
      {selectedUser && (
        <p style={{ color: "green" }}>
          Active Selection: <strong>{selectedUser.name}</strong> ({selectedUser.email})
        </p>
      )}

      <h2>Discovered Items ({filteredItems.length})</h2>
      {filteredItems.length === 0 ? (
        <p>No matching items found.</p>
      ) : (
        filteredItems.map((item) => <ItemCard key={item.id} item={item} />)
      )}

      <h2>Active Claim Workflow</h2>
      <ClaimBadge claim={mockClaim} claimedBy={mockUser.name}>
        <p>⚠️ Pending approval from security personnel.</p>
      </ClaimBadge>
    </div>
  );
}

export default App;
