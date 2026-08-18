import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClaims, fetchClaimsByItemId, createClaim, updateClaimStatus } from '../api/client';
import type { Claim, ClaimCreateInput } from '../types';

export const CLAIMS_QUERY_KEY = ['claims'] as const;
export const CLAIMS_BY_ITEM_QUERY_KEY = (itemId: string) => ['claims', itemId] as const;

/**
 * Hook: Fetch all claims (useQuery)
 */
export const useClaims = () => {
  return useQuery<Claim[], Error>({
    queryKey: CLAIMS_QUERY_KEY,
    queryFn: fetchClaims,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook: Fetch claims for a specific item (useQuery)
 */
export const useClaimsByItemId = (itemId: string | undefined) => {
  return useQuery<Claim[], Error>({
    queryKey: CLAIMS_BY_ITEM_QUERY_KEY(itemId || ''),
    queryFn: () => fetchClaimsByItemId(itemId!),
    enabled: Boolean(itemId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook: Create a new claim (useMutation)
 * Invalidates claims queries on success
 */
export const useCreateClaim = () => {
  const queryClient = useQueryClient();

  return useMutation<Claim, Error, ClaimCreateInput>({
    mutationFn: (claimData: ClaimCreateInput) => createClaim(claimData),
    onSuccess: (newClaim: Claim) => {
      queryClient.invalidateQueries({ queryKey: CLAIMS_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: CLAIMS_BY_ITEM_QUERY_KEY(newClaim.itemId),
      });
    },
  });
};

/**
 * Hook: Update claim status (useMutation)
 */
export const useUpdateClaimStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<Claim, Error, { id: string; status: 'pending' | 'approved' | 'rejected' }>({
    mutationFn: ({ id, status }) => updateClaimStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLAIMS_QUERY_KEY });
    },
  });
};
