import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ItemCard from './ItemCard';
import type { Item } from '../types';

const reportedItem: Item = {
  id: 'item-101',
  title: 'Blue campus backpack',
  description: 'A blue backpack with a silver keychain.',
  location: 'Science Building',
  status: 'lost',
  dateReported: '2026-10-17T10:30:00.000Z',
  categoryId: '2',
};

describe('ItemCard', () => {
  it('shows the reported item status and title', () => {
    render(<ItemCard item={reportedItem} />);

    expect(screen.getByText('lost')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Blue campus backpack' })).toBeInTheDocument();
  });
});
