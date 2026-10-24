import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { askAi } from '../api/client';
import type { AiReview } from '../types';
import { reviewFormSchema, type ReviewFormValues } from '../schemas/reviewSchema';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const READINESS_STYLE: Record<AiReview['readiness'], string> = {
  ready: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  almost: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  'not-yet': 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

export default function ReviewPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
  });
  const review = useMutation({
    mutationFn: askAi,
  });

  const onSubmit = (values: ReviewFormValues): void => {
    review.mutate(values.prompt);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          AI Review
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Describe your project and get feedback before you submit it.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"
      >
        <div className="space-y-1.5">
          <Label htmlFor="prompt" className="text-foreground">
            Project description
          </Label>
          <textarea
            id="prompt"
            rows={6}
            aria-invalid={errors.prompt ? true : undefined}
            placeholder="What it does, how it is built, and who it helps..."
            {...register('prompt')}
            className="flex w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-1 aria-invalid:ring-red-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:aria-invalid:border-red-500"
          />
          {errors.prompt && (
            <p role="alert" className="text-sm text-red-600 dark:text-red-400">
              {errors.prompt.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={review.isPending}>
          {review.isPending ? 'Reviewing...' : 'Review my project'}
        </Button>
        {review.isError && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {review.error.message}
          </p>
        )}
      </form>

      {review.data && (
        <section
          aria-live="polite"
          aria-labelledby="review-summary"
          className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"
        >
          <span
            className={`justify-self-start rounded-full px-3 py-1 text-sm font-semibold capitalize ${READINESS_STYLE[review.data.readiness]}`}
          >
            {review.data.readiness}
          </span>
          <div>
            <h2 id="review-summary" className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Summary
            </h2>
            <p className="mt-1 text-slate-700 dark:text-slate-300">{review.data.summary}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Strengths</h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-slate-700 dark:text-slate-300">
              {review.data.strengths.map((strength, index) => (
                <li key={`${index}-${strength}`}>{strength}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Before you submit</h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-slate-700 dark:text-slate-300">
              {review.data.improvements.map((improvement, index) => (
                <li key={`${index}-${improvement}`}>{improvement}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
