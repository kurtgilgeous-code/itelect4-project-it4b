import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchItems, fetchItemById, createItem, updateItem, deleteItem } from '../api/client';
import type { Item, ItemCreateInput, ItemUpdateInput } from '../types';

export const ITEMS_QUERY_KEY = ['items'] as const;
export const ITEM_DETAIL_QUERY_KEY = (id: string) => ['items', id] as const;

/**
 * Hook: Fetch all items (useQuery)
 */
export const useItems = () => {
  return useQuery<Item[], Error>({
    queryKey: ITEMS_QUERY_KEY,
    queryFn: fetchItems,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook: Fetch single item by ID (useQuery)
 */
export const useItemById = (id: string | undefined) => {
  return useQuery<Item, Error>({
    queryKey: ITEM_DETAIL_QUERY_KEY(id || ''),
    queryFn: () => fetchItemById(id!),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook: Create a new item (useMutation)
 * Invalidates ['items'] on success to automatically trigger refetching
 */
export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation<Item, Error, ItemCreateInput>({
    mutationFn: (itemData: ItemCreateInput) => createItem(itemData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
  });
};

/**
 * Hook: Update an existing item (useMutation)
 */
export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation<Item, Error, { id: string; data: ItemUpdateInput }>({
    mutationFn: ({ id, data }) => updateItem(id, data),
    onSuccess: (updatedItem: Item) => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ITEM_DETAIL_QUERY_KEY(updatedItem.id) });
    },
  });
};

/**
 * Hook: Delete an item (useMutation)
 */
export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id: string) => deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
  });
};
