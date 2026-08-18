import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchCategoryById } from '../api/client';
import type { Category } from '../types';

export const CATEGORIES_QUERY_KEY = ['categories'] as const;
export const CATEGORY_DETAIL_QUERY_KEY = (id: string) => ['categories', id] as const;

/**
 * Hook: Fetch all categories (useQuery)
 */
export const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook: Fetch a single category by ID (useQuery)
 */
export const useCategoryById = (id: string | undefined) => {
  return useQuery<Category, Error>({
    queryKey: CATEGORY_DETAIL_QUERY_KEY(id || ''),
    queryFn: () => fetchCategoryById(id!),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
