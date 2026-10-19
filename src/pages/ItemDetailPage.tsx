import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useItemById } from '../hooks/useItemsQuery';
import { useClaimsByItemId, useCreateClaim, useUpdateClaimStatus } from '../hooks/useClaimsQuery';
import { useCategories } from '../hooks/useCategoriesQuery';
import useAuthStore from '../store/authStore';
import type { Category, Claim } from '../types';

export default function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token, user } = useAuthStore();
  const [showClaimForm, setShowClaimForm] = useState(false);

  // 1. Fetch single item by URL id parameter using TanStack Query
  const { data: item, isLoading: itemLoading, error: itemError } = useItemById(id);

  // 2. Fetch claims associated with this item
  const { data: claims = [] } = useClaimsByItemId(id);

  // 3. Fetch categories for name lookup
  const { data: categories = [] } = useCategories();

  // 4. Mutations
  const createClaimMutation = useCreateClaim();
  const updateClaimMutation = useUpdateClaimStatus();

  if (itemLoading) {
    return (
      <div className="flex h-48 items-center justify-center text-slate-500">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-600 border-t-transparent"></div>
          <span>Loading item details...</span>
        </div>
      </div>
    );
  }

  if (itemError || !item) {
    return (
      <div className="space-y-4 rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-950/50">
        <h2 className="text-xl font-bold text-red-800 dark:text-red-200">Item Not Found</h2>
        <p className="text-sm text-red-700 dark:text-red-300">
          We couldn't retrieve the requested item from the database.
        </p>
        <button
          onClick={() => navigate('/items')}
          className="rounded-xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800"
        >
          ← Back to Items
        </button>
      </div>
    );
  }

  const category = categories.find((c: Category) => c.id === item.categoryId);

  // Submit new claim
  const handleSubmitClaim = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!item) return;

    createClaimMutation.mutate(
      { itemId: item.id },
      {
        onSuccess: () => {
          setShowClaimForm(false);
        },
      }
    );
  };

  const canReviewClaims = Boolean(user && (user.role === 'admin' || item.isOwner));

  // Item owners and administrators can review claims.
  const handleApproveClaim = (claimId: string) => {
    updateClaimMutation.mutate({ id: claimId, status: 'approved' });
  };

  // Staff action: Reject Claim
  const handleRejectClaim = (claimId: string) => {
    updateClaimMutation.mutate({ id: claimId, status: 'rejected' });
  };

  return (
    <div className="space-y-6">
      {/* Item Details Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300">
                {category ? `${category.icon} ${category.name}` : 'General'}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                  item.status === 'found'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : item.status === 'claimed'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}
              >
                {item.status}
              </span>
            </div>

            <h1 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {item.title}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {item.description}
            </p>
          </div>

          <button
            onClick={() => navigate('/items')}
            className="self-start rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            ← All Items
          </button>
        </div>

        <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 dark:border-slate-800 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-slate-100 p-2.5 dark:bg-slate-800">📍</div>
            <div>
              <p className="text-xs font-medium text-slate-400">Location Found</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-slate-100 p-2.5 dark:bg-slate-800">📅</div>
            <div>
              <p className="text-xs font-medium text-slate-400">Date Reported</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {new Date(item.dateReported).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Claim Action Button */}
        <div className="mt-8 flex flex-wrap gap-3">
          {item.status === 'claimed' ? (
            <div className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
              ✓ This item has already been successfully claimed and returned.
            </div>
          ) : token ? (
            user && !item.isOwner ? (
              <button
                onClick={() => setShowClaimForm((prev) => !prev)}
                className="rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              >
                {showClaimForm ? 'Close Claim Form' : 'Claim This Item'}
              </button>
            ) : null
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500"
            >
              Sign in to claim this item
            </button>
          )}
        </div>
      </div>

      {/* Claim Form Accordion */}
      {showClaimForm && (
        <form
          onSubmit={handleSubmitClaim}
          className="rounded-3xl border border-cyan-200 bg-cyan-50/50 p-6 dark:border-cyan-900/40 dark:bg-cyan-950/20"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Submit Ownership Claim</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Your account name will be included. The item owner or an administrator can review your claim.
          </p>

          <div className="mt-4 space-y-3">
            {createClaimMutation.isError && (
              <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                {createClaimMutation.error.message}
              </p>
            )}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={createClaimMutation.isPending}
                className="rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500 disabled:opacity-50"
              >
                {createClaimMutation.isPending ? 'Submitting Claim...' : 'Confirm & Submit'}
              </button>
              <button
                type="button"
                onClick={() => setShowClaimForm(false)}
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Associated Claims Section */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {canReviewClaims ? `Claims for this Item (${claims.length})` : 'Item Claims'}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
                {canReviewClaims
                  ? `Logged in as ${user?.name}. You can review pending claims.`
                  : token
                    ? 'Only the item owner or an administrator can view submitted claims.'
                    : 'Sign in as the item owner to review submitted claims.'}
              </p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {canReviewClaims && claims.length > 0 ? (
            claims.map((claim: Claim) => (
              <div
                key={claim.id}
                className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{claim.claimantName}</p>
                  <p className="text-xs text-slate-500">
                    Claimed on {new Date(claim.claimDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                      claim.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : claim.status === 'rejected'
                          ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {claim.status}
                  </span>

                  {/* Staff Action Buttons for Pending Claims */}
                  {canReviewClaims && claim.status === 'pending' && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleApproveClaim(claim.id)}
                        disabled={updateClaimMutation.isPending}
                        className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-emerald-500 disabled:opacity-50"
                        title="Approve claim and mark item as claimed"
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => handleRejectClaim(claim.id)}
                        disabled={updateClaimMutation.isPending}
                        className="rounded-lg bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-500 disabled:opacity-50"
                        title="Reject claim"
                      >
                        ✕ Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : canReviewClaims ? (
            <p className="text-sm text-slate-500 italic">No claims filed yet for this item.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
