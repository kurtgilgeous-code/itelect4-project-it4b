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
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">User profile</p>
      <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">{user.name}</h3>

      <dl className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
        <div className="flex items-center justify-between gap-3">
          <dt className="font-medium text-slate-500 dark:text-slate-400">Email</dt>
          <dd className="text-right text-slate-700 dark:text-slate-200">{user.email}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="font-medium text-slate-500 dark:text-slate-400">Role</dt>
          <dd className="text-right capitalize text-slate-700 dark:text-slate-200">{user.role}</dd>
        </div>
      </dl>

      <button
        className="mt-5 rounded-full bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-500"
        onClick={handleClick}
      >
        Switch profile
      </button>
    </div>
  );
}

export default UserCard;