import { useClaims, useUpdateClaimStatus } from '../hooks/useClaimsQuery';
import { useItems, useUpdateItem } from '../hooks/useItemsQuery';
import useAuthStore from '../store/authStore';
import { Link } from 'react-router';
import type { Claim, Item } from '../types';

export default function ProtectedPage() {
  const { userName } = useAuthStore();
  const { data: claims = [], isLoading: claimsLoading } = useClaims();
  const { data: items = [] } = useItems();

  const updateClaimMutation = useUpdateClaimStatus();
  const updateItemMutation = useUpdateItem();

  const getItemTitle = (itemId: string) => {
    return items.find((i: Item) => i.id === itemId)?.title || `Item #${itemId}`;
  };

  const handleApprove = (claim: Claim) => {
    updateClaimMutation.mutate(
      { id: claim.id, status: 'approved' },
      {
        onSuccess: () => {
          // Also mark the associated item as claimed
          updateItemMutation.mutate({
            id: claim.itemId,
            data: { status: 'claimed' },
          });
        },
      }
    );
  };

  const handleReject = (claimId: string) => {
    updateClaimMutation.mutate({ id: claimId, status: 'rejected' });
  };

  const pendingClaims = claims.filter((c: Claim) => c.status === 'pending');
  const resolvedClaims = claims.filter((c: Claim) => c.status !== 'pending');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Campus Staff Admin Portal
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Welcome, <span className="font-semibold text-cyan-600">{userName || 'Staff Member'}</span>. Review and verify student ownership claims here.
        </p>
      </div>

      {/* Pending Claims Queue */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Pending Review Queue ({pendingClaims.length})
            </h2>
            <p className="text-xs text-slate-500">
              Claims awaiting verification and handover approval.
            </p>
          </div>
        </div>

        {claimsLoading ? (
          <div className="p-8 text-center text-slate-500">Loading claims queue...</div>
        ) : pendingClaims.length > 0 ? (
          <div className="mt-5 space-y-3">
            {pendingClaims.map((claim: Claim) => (
              <div
                key={claim.id}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-amber-200/60 bg-amber-50/40 p-4 dark:border-amber-900/30 dark:bg-amber-950/20 sm:flex-row sm:items-center"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {claim.claimantName}
                    </span>
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold uppercase text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      Pending
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Claiming: <Link to={`/items/${claim.itemId}`} className="font-semibold text-cyan-600 hover:underline">{getItemTitle(claim.itemId)}</Link>
                  </p>
                  <p className="text-xs text-slate-400">
                    Submitted: {new Date(claim.claimDate).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(claim)}
                    disabled={updateClaimMutation.isPending}
                    className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-500 disabled:opacity-50"
                  >
                    ✓ Approve & Handover
                  </button>
                  <button
                    onClick={() => handleReject(claim.id)}
                    disabled={updateClaimMutation.isPending}
                    className="rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-red-500 disabled:opacity-50"
                  >
                    ✕ Reject Claim
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500 dark:border-slate-800">
            ✓ No pending claims in queue. All submissions have been processed!
          </div>
        )}
      </div>

      {/* Resolved Claims History */}
      {resolvedClaims.length > 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Processed History ({resolvedClaims.length})
          </h2>
          <div className="mt-4 space-y-2">
            {resolvedClaims.map((claim: Claim) => (
              <div
                key={claim.id}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm dark:border-slate-800 dark:bg-slate-950"
              >
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{claim.claimantName}</span>
                  <span className="text-slate-500"> claimed {getItemTitle(claim.itemId)}</span>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${
                    claim.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                  }`}
                >
                  {claim.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
