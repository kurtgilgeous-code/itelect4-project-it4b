import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router';
import Layout from './Layout';
import useAuthStore from '../store/authStore';

describe('Layout', () => {
  beforeEach(() => {
    useAuthStore.setState({
      token: 'test-token',
      user: {
        id: 'user-1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'student',
        isActive: true,
      },
    });
  });

  it('logs out and redirects to the login page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<p>Home page</p>} />
          </Route>
          <Route path="/login" element={<p>Sign in page</p>} />
        </Routes>
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: 'Logout' }));

    expect(screen.getByText('Sign in page')).toBeInTheDocument();
    expect(useAuthStore.getState().token).toBeNull();
    expect(useAuthStore.getState().user).toBeNull();
  });
});
