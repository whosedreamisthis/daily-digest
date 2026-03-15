import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import SearchBar from '@/components/SearchBar';
import { useRouter, usePathname } from 'next/navigation';
import { useNewsStore } from '@/stores/useNewsStore';

// 1. Mock Next.js Navigation
vi.mock('next/navigation', () => ({
	useRouter: vi.fn(),
	usePathname: vi.fn(),
}));

// 2. Mock the Store to prevent LocalStorage/Persistence errors
vi.mock('@/stores/useNewsStore', () => ({
	useNewsStore: vi.fn(),
}));

describe('SearchBar Component', () => {
	const mockPush = vi.fn();
	const mockSetQuery = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();

		// Setup Router & Pathname
		vi.mocked(useRouter).mockReturnValue({
			push: mockPush,
			replace: vi.fn(),
		} as any);
		vi.mocked(usePathname).mockReturnValue('/');

		// Setup Store Mock: This bypasses the real Zustand logic (and the LocalStorage error)
		vi.mocked(useNewsStore).mockImplementation((selector) =>
			selector({
				query: '',
				setQuery: mockSetQuery,
			} as any),
		);
	});

	it('updates the store value when the user types', async () => {
		const user = userEvent.setup();
		render(<SearchBar />);

		const input = screen.getByPlaceholderText(/search stories/i);
		await user.type(input, 'TypeScript');

		expect(mockSetQuery).toHaveBeenCalled();
	});

	it('navigates to the correct URL on form submission', async () => {
		const user = userEvent.setup();

		// Simulate the store having "React 19" in it
		vi.mocked(useNewsStore).mockImplementation((selector) =>
			selector({
				query: 'React 19',
				setQuery: mockSetQuery,
			} as any),
		);

		render(<SearchBar />);

		const input = screen.getByPlaceholderText(/search stories/i);
		await user.type(input, '{Enter}');

		expect(mockPush).toHaveBeenCalledWith('/search?q=React%2019');
	});

	it('does not navigate if the input is empty', async () => {
		const user = userEvent.setup();
		render(<SearchBar />);

		const input = screen.getByPlaceholderText(/search stories/i);
		await user.type(input, '{Enter}');

		expect(mockPush).not.toHaveBeenCalled();
	});
});
