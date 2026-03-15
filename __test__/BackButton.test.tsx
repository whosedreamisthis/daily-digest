import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import BackButton from '@/components/BackButton';

const mockBack = vi.fn();

vi.mock('next/navigation', () => ({
	useRouter: () => ({
		back: mockBack,
		// Including other common methods prevents 'undefined' errors
		// if the component or hooks change later.
		push: vi.fn(),
		replace: vi.fn(),
		prefetch: vi.fn(),
	}),
}));

describe('BackButton Component', () => {
	// Reset mocks before each test to ensure test isolation
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders correctly with the expected label and icon', () => {
		render(<BackButton />);

		const button = screen.getByRole('button', { name: /go back/i });

		expect(button).toBeInTheDocument();
	});

	it('triggers router.back exactly once when clicked', async () => {
		// Setup the user session (Best practice for Testing Library)
		const user = userEvent.setup();

		render(<BackButton />);

		const button = screen.getByRole('button', { name: /go back/i });

		// Perform the interaction
		await user.click(button);

		// Assert that the mock we defined at the top was called
		expect(mockBack).toHaveBeenCalledTimes(1);
	});

	it('is accessible and has the correct button type', () => {
		render(<BackButton />);
		const button = screen.getByRole('button');

		// Interviews often look for accessibility/HTML structure knowledge
		expect(button).not.toHaveAttribute('type', 'submit');
	});
});
