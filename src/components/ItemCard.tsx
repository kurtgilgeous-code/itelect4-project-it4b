import type { LostItem } from "../types/index";

interface ItemCardProps {
  item: LostItem;
}

function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="card item-card">
      <h3>📦 Logged Item</h3>
      <p className="item-title">{item.title}</p>
      <p>{item.description}</p>
      <p>📍 {item.locationFound}</p>
      <small>Reported on {item.createdAt.toLocaleDateString()}</small>
    </div>
  );
}

export default ItemCard;