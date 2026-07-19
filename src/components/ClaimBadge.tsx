import type { Claim } from "../types/index";

interface ClaimBadgeProps {
  claim?: Claim;
  claimedBy: string;
}

const ClaimBadge = ({ claim, claimedBy }: ClaimBadgeProps) => {
  if (!claim) {
    return (
      <div className="card badge-card">
        <h4>No claim found</h4>
        <p>There is no claim associated with this item yet.</p>
      </div>
    );
  }

  return (
    <div className="card badge-card">
      <h4>Claim Reference #{claim.id}</h4>
      <p>Item ID: {claim.itemId}</p>
      <p>Claimed by: {claimedBy}</p>
      <p>
        Workflow Lifecycle Status:
        <span className="status-pill">{claim.status}</span>
      </p>
    </div>
  );
};

export default ClaimBadge;