import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateItem } from '../hooks/useItemsQuery';
import { useCategories } from '../hooks/useCategoriesQuery';
import { itemSchema, type ItemFormValues } from '../schemas/itemSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Category } from '../types';

export default function ReportItemPage() {
  const navigate = useNavigate();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const createItemMutation = useCreateItem();

  // Initialize React Hook Form with Zod schema resolver and onBlur validation mode
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      location: '',
      status: 'found',
      categoryId: '1',
      dateReported: new Date().toISOString().slice(0, 16),
    },
  });

  const onSubmit = (data: ItemFormValues) => {
    // Ensure dateReported is converted to ISO string before API write path
    const payload = {
      ...data,
      dateReported: new Date(data.dateReported).toISOString(),
    };

    createItemMutation.mutate(payload, {
      onSuccess: (newItem) => {
        // Reset form fields only on successful server write
        reset();
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
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"
      >
        {/* Title */}
        <div className="space-y-1.5">
          <Label htmlFor="title" className="text-foreground">
            Item Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="e.g. Space Gray MacBook Pro"
            aria-invalid={errors.title ? true : undefined}
            {...register('title')}
          />
          {errors.title && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label htmlFor="description" className="text-foreground">
            Description <span className="text-red-500">*</span>
          </Label>
          <textarea
            id="description"
            rows={4}
            placeholder="Include color, brand, distinct stickers or marks, etc."
            aria-invalid={errors.description ? true : undefined}
            {...register('description')}
            className="flex w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 aria-invalid:border-red-500 aria-invalid:ring-1 aria-invalid:ring-red-500 dark:aria-invalid:border-red-500"
          />
          {errors.description && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Category & Status Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="categoryId" className="text-foreground">
              Category <span className="text-red-500">*</span>
            </Label>
            <select
              id="categoryId"
              disabled={categoriesLoading}
              aria-invalid={errors.categoryId ? true : undefined}
              {...register('categoryId')}
              className="flex h-10 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 aria-invalid:border-red-500 dark:aria-invalid:border-red-500"
            >
              <option value="">Select a category</option>
              {categories.map((cat: Category) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="status" className="text-foreground">
              Status <span className="text-red-500">*</span>
            </Label>
            <select
              id="status"
              aria-invalid={errors.status ? true : undefined}
              {...register('status')}
              className="flex h-10 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 aria-invalid:border-red-500 dark:aria-invalid:border-red-500"
            >
              <option value="found">Found (I discovered it)</option>
              <option value="lost">Lost (I am looking for it)</option>
            </select>
            {errors.status && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.status.message}
              </p>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <Label htmlFor="location" className="text-foreground">
            Campus Location <span className="text-red-500">*</span>
          </Label>
          <Input
            id="location"
            type="text"
            placeholder="e.g. Science Complex - Room 302"
            aria-invalid={errors.location ? true : undefined}
            {...register('location')}
          />
          {errors.location && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Date Reported */}
        <div className="space-y-1.5">
          <Label htmlFor="dateReported" className="text-foreground">
            Date & Time Reported <span className="text-red-500">*</span>
          </Label>
          <Input
            id="dateReported"
            type="datetime-local"
            aria-invalid={errors.dateReported ? true : undefined}
            {...register('dateReported')}
          />
          {errors.dateReported && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.dateReported.message}
            </p>
          )}
        </div>

        {/* Server Error Notification */}
        {createItemMutation.isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-300">
            Failed to submit item: {createItemMutation.error.message}
          </div>
        )}

        {/* Form Actions */}
        <div className="flex gap-3 pt-3">
          <Button
            type="submit"
            disabled={createItemMutation.isPending}
            className="flex-1"
          >
            {createItemMutation.isPending ? 'Publishing Report...' : 'Submit Report'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/items')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
