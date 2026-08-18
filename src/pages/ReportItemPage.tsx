import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCreateItem } from '../hooks/useItemsQuery';
import { useCategories } from '../hooks/useCategoriesQuery';
import type { ItemCreateInput, Category } from '../types';

export default function ReportItemPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ItemCreateInput>({
    title: '',
    description: '',
    location: '',
    status: 'found',
    dateReported: new Date().toISOString(),
    categoryId: '1',
  });

  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const createItemMutation = useCreateItem();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createItemMutation.mutate(formData, {
      onSuccess: (newItem) => {
        // Navigate to the newly created item's detail page
        navigate(`/items/${newItem.id}`);
      },
    });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Report Lost or Found Item
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Submit details about an item discovered or lost on campus.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"
      >
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Item Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g. Space Gray MacBook Pro"
            required
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Include color, brand, distinct stickers or marks, etc."
            required
            rows={4}
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        {/* Category & Status Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="categoryId" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              required
              disabled={categoriesLoading}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              {categories.map((cat: Category) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="found">Found (I discovered it)</option>
              <option value="lost">Lost (I am looking for it)</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g. Science Complex - Room 302"
            required
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        {/* Error Notification */}
        {createItemMutation.isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-300">
            Failed to submit item: {createItemMutation.error.message}
          </div>
        )}

        {/* Form Actions */}
        <div className="flex gap-3 pt-3">
          <button
            type="submit"
            disabled={createItemMutation.isPending}
            className="flex-1 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 disabled:opacity-50"
          >
            {createItemMutation.isPending ? 'Publishing Report...' : 'Submit Report'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/items')}
            className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
