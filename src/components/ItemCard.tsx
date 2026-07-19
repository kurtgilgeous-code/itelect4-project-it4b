import type { LostItem } from "../types/index";

interface ItemCardProps {
  item: LostItem;
  foundBy: string;
  statusLabel: string;
}

function ItemCard({ item, foundBy, statusLabel }: ItemCardProps) {
  return (
    <div className="card item-card">
      <h3>📦 Logged Item</h3>
      <p className="item-title">{item.title}</p>
      <p>{item.description}</p>
      <p>📍 {item.locationFound}</p>
      <p>👤 Found by: {foundBy}</p>
      <p>
        Status:
        <span className={`status-pill ${statusLabel.toLowerCase().replace(/\s+/g, "-")}`}>
          {statusLabel}
        </span>
      </p>
      <small>Reported on {item.createdAt.toLocaleDateString()}</small>
    </div>
  );
}

export default ItemCard;