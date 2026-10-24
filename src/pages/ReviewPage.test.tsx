import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { askAi } from '../api/client';
import ReviewPage from './ReviewPage';

vi.mock('../api/client', () => ({
  askAi: vi.fn(),
}));

function renderReviewPage() {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <ReviewPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('ReviewPage validation', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('shows the schema error and does not call the AI API for an empty prompt', async () => {
    const user = userEvent.setup();
    renderReviewPage();

    await user.click(screen.getByRole('button', { name: 'Review my project' }));

    expect(
      await screen.findByText('Describe your project in at least 20 characters.'),
    ).toBeInTheDocument();
    expect(vi.mocked(askAi)).not.toHaveBeenCalled();
  });
});
