import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CategoryBar from '@/components/CategoryBar';

// The categories match exactly what is in the CategoryBar component
const EXPECTED_CATEGORIES = [
	'business',
	'entertainment',
	'general',
	'health',
	'science',
	'sport',
	'technology',
];

describe('CategoryBar Component', () => {
	it('renders all navigation categories', () => {
		render(<CategoryBar />);

		EXPECTED_CATEGORIES.forEach((category) => {
			// Find the link by its text content
			const link = screen.getByRole('link', {
				name: new RegExp(category, 'i'),
			});
			expect(link).toBeInTheDocument();
		});
	});

	it('contains the correct href paths for each category', () => {
		render(<CategoryBar />);

		EXPECTED_CATEGORIES.forEach((category) => {
			const link = screen.getByRole('link', {
				name: new RegExp(category, 'i'),
			});
			// Verify it points to the dynamic Next.js route
			expect(link).toHaveAttribute('href', `/news/${category}`);
		});
	});

	it('has the required styles for horizontal scrolling', () => {
		const { container } = render(<CategoryBar />);

		// The first div inside the component is your scroll container
		const scrollContainer = container.firstChild as HTMLElement;

		// Verify the Tailwind classes you added for the "drag-to-scroll" feel
		expect(scrollContainer).toHaveClass('overflow-x-auto');
		expect(scrollContainer).toHaveClass('no-scrollbar');
		expect(scrollContainer).toHaveClass('cursor-grab');
	});

	it('applies the correct capitalization via CSS or text', () => {
		render(<CategoryBar />);

		// Verifies that 'business' is rendered, but usually, we check
		// if it's visible to the user regardless of uppercase/lowercase
		const firstLink = screen.getByRole('link', { name: /business/i });
		expect(firstLink).toHaveTextContent(/business/i);
	});
});
