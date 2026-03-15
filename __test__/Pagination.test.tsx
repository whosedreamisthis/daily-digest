import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Pagination from '@/components/Pagination';

describe('Pagination Component', () => {
	const defaultProps = {
		currentPage: 2,
		totalPages: 5,
		category: 'technology',
	};

	it('renders the current page and total pages correctly', () => {
		render(<Pagination {...defaultProps} />);
		expect(screen.getByText(/page 2 of 5/i)).toBeInTheDocument();
	});

	it('generates the correct link for standard categories', () => {
		render(<Pagination {...defaultProps} />);

		const nextLink = screen
			.getByRole('link', { name: /next page/i })
			.closest('a');
		const prevLink = screen
			.getByRole('link', { name: /previous page/i })
			.closest('a');

		expect(nextLink).toHaveAttribute('href', '/news/technology?page=3');
		expect(prevLink).toHaveAttribute('href', '/news/technology?page=1');
	});

	it('handles search query URLs correctly', () => {
		render(<Pagination {...defaultProps} category="search?q=typescript" />);

		const nextLink = screen
			.getByRole('link', { name: /next page/i })
			.closest('a');
		expect(nextLink).toHaveAttribute('href', '/search?q=typescript&page=3');
	});

	it('disables the "Previous" button on the first page', () => {
		render(<Pagination {...defaultProps} currentPage={1} />);

		const prevLink = screen
			.getByRole('link', { name: /previous page/i })
			.closest('a');
		expect(prevLink).toHaveClass('pointer-events-none');
		expect(prevLink).toHaveClass('opacity-30');
	});

	it('disables the "Next" button on the last page', () => {
		render(<Pagination {...defaultProps} currentPage={5} />);

		const nextLink = screen
			.getByRole('link', { name: /next page/i })
			.closest('a');
		expect(nextLink).toHaveClass('pointer-events-none');
		expect(nextLink).toHaveClass('opacity-30');
	});
});
