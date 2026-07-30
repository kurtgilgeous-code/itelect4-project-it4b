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
      <div className="card badge-card">
        <h4>No claim found</h4>
        <p>There is no claim associated with this item yet.</p>
        {children}
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
      {children}
    </div>
  );
};

export default ClaimBadge;