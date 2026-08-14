import { useParams, useNavigate } from "react-router";
import { initialItems } from "../data/mockData";

export default function ItemDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const navigate = useNavigate();

  const item = initialItems.find((i) => i.id === id);

  if (!item) {
    return (
      <div>
        <h2 className="text-xl font-semibold">Item not found</h2>
        <p className="text-sm">We couldn't find that item.</p>
        <button onClick={() => navigate(-1)} className="mt-4 rounded border px-3 py-1">Back</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4">
        <h2 className="text-2xl font-semibold">{item.title}</h2>
        <p className="text-sm text-slate-600">Location: {item.locationFound}</p>
        <p className="mt-2">{item.description}</p>
      </div>

      <div>
        <button onClick={() => navigate(-1)} className="rounded border px-3 py-1">Back</button>
      </div>
    </div>
  );
}
