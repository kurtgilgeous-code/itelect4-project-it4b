
export default function ProtectedPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold">Admin Area</h2>
      <p className="text-sm">Only authenticated users can see this content.</p>
    </div>
  );
}
