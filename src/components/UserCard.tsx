import type { User } from "../types/index";

interface UserCardProps {
  user: User;
  onSelect: (user: User) => void;
}

function UserCard({ user, onSelect }: UserCardProps) {
  const handleClick = (): void => {
    onSelect(user);
  };

  return (
    <div className="card user-card">
      <h3>{user.name}</h3>

      <div className="field-row">
        <span className="field-label">Email:</span>
        <span className="field-value">{user.email}</span>
      </div>

      <div className="field-row">
        <span className="field-label">Role:</span>
        <span className="field-value">{user.role}</span>
      </div>

      <div className="button-group">
        <button className="button" onClick={handleClick}>
          Switch Profile
        </button>
      </div>
    </div>
  );
}

export default UserCard;