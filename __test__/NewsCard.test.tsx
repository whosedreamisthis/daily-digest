import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import NewsCard from '@/components/NewsCard';
import { useNewsStore } from '@/stores/useNewsStore';
import { Article } from '@/lib/types';

// 1. Mock the store module
vi.mock('@/stores/useNewsStore', () => ({
	useNewsStore: vi.fn(),
}));

// Define a clean mock article that matches your Article interface
const mockArticle: Article = {
	title: 'Breaking Vitest News',
	description: 'A deep dive into type-safe testing.',
	source: { id: 'tech-daily', name: 'Tech Daily' },
	urlToImage: '/test.jpg',
	url: 'https://techdaily.com/vitest',
	publishedAt: '2026-03-15T12:00:00Z',
	content: 'Full content here...',
};

describe('NewsCard Component', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('updates the Zustand store when the title is clicked', async () => {
		const setArticleSpy = vi.fn();

		const mockState = { setArticle: setArticleSpy } as ReturnType<
			typeof useNewsStore
		>;

		// 2. Implementation: Just run the selector and give it your fake state
		vi.mocked(useNewsStore).mockImplementation((selector) => {
			return selector(mockState);
		});

		const user = userEvent.setup();
		render(<NewsCard article={mockArticle} index={0} />);

		// Search for the link by its accessible name (the title)
		const link = screen.getByRole('link', {
			name: /breaking vitest news/i,
		});
		await user.click(link);

		// Verify the store update
		expect(setArticleSpy).toHaveBeenCalledWith(mockArticle);
	});

	it('encodes the article title correctly in the navigation URL', () => {
		vi.mocked(useNewsStore).mockImplementation((selector) =>
			selector({ setArticle: vi.fn() } as any),
		);

		render(<NewsCard article={mockArticle} index={0} />);

		const link = screen.getByRole('link', {
			name: /breaking vitest news/i,
		});

		// Verifies encodeURIComponent is working for the dynamic route
		expect(link).toHaveAttribute(
			'href',
			'/article/Breaking%20Vitest%20News',
		);
	});
});
