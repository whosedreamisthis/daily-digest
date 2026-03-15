import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import HeroArticle from '@/components/HeroArticle';
import { useNewsStore } from '@/stores/useNewsStore';

// 1. Mock dependencies
vi.mock('@/stores/useNewsStore', () => ({
	useNewsStore: vi.fn(),
}));

vi.mock('next/image', () => ({
	__esModule: true,
	default: ({ src, alt, priority, fill, ...props }: any) => {
		return (
			<img
				src={src}
				alt={alt}
				// We convert the booleans to strings on data-attributes to avoid React warnings
				data-priority={priority ? 'true' : 'false'}
				data-fill={fill ? 'true' : 'false'}
				{...props}
			/>
		);
	},
}));

// Mock SafeImage to avoid actual image loading logic
vi.mock('./SafeImage', () => ({
	default: ({ src, alt, priority }: any) => (
		<img
			src={src}
			alt={alt}
			data-priority={priority.toString()}
			role="img"
		/>
	),
}));

describe('HeroArticle Component', () => {
	const mockArticle = {
		title: 'Main Breaking Story',
		urlToImage: 'https://example.com/hero.jpg',
		source: { name: 'World News' },
	};

	const mockSetArticle = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		vi.mocked(useNewsStore).mockImplementation((selector) =>
			selector({ setArticle: mockSetArticle } as any),
		);
	});

	it('renders the hero content and high-priority image', () => {
		render(<HeroArticle article={mockArticle as any} />);

		expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
		expect(screen.getByText(/World News/i)).toBeInTheDocument();

		const img = screen.getByRole('img');
		expect(img).toHaveAttribute('src', mockArticle.urlToImage);
		// Crucial: check that priority is passed for LCP performance
		expect(img.getAttribute('data-priority')).toBe('true');
	});

	it('syncs with the store and navigates with a slug on click', async () => {
		const user = userEvent.setup();
		render(<HeroArticle article={mockArticle as any} />);

		const link = screen.getByRole('link');
		await user.click(link);

		// Verify the store update
		expect(mockSetArticle).toHaveBeenCalledWith(mockArticle);

		// Verify the slug generation logic (assuming generateSlug('Main Breaking Story') -> 'main-breaking-story')
		expect(link).toHaveAttribute('href', '/article/main-breaking-story');
	});
});
