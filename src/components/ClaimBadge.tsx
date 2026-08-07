import type { Claim } from "../types/index";
import type { ReactNode } from "react";

interface ClaimBadgeProps {
  claim?: Claim;
  claimedBy: string;
  children?: ReactNode;
}

const ClaimBadge = ({ claim, claimedBy, children }: ClaimBadgeProps) => {
  if (!claim) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">Claim badge</p>
        <h4 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">No claim found</h4>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">There is no claim associated with this item yet.</p>
        {children}
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">Claim workflow</p>
      <h4 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">Reference #{claim.id}</h4>
      <dl className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
        <div className="flex items-center justify-between gap-3">
          <dt className="font-medium text-slate-500 dark:text-slate-400">Item ID</dt>
          <dd className="text-slate-700 dark:text-slate-200">{claim.itemId}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="font-medium text-slate-500 dark:text-slate-400">Claimed by</dt>
          <dd className="text-slate-700 dark:text-slate-200">{claimedBy}</dd>
        </div>
      </dl>
      <div className="mt-4 inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-200">
        {claim.status}
      </div>
      {children}
    </div>
  );
};

export default ClaimBadge;