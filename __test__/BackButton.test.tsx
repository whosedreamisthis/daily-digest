import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { vi, describe, it, expect } from 'vitest';
import BackButton from '@/components/BackButton';

// Mock useRouter
vi.mock('next/navigation', () => ({
	useRouter: vi.fn(),
}));

describe('BackButton', () => {
	it('navigates back when clicked', async () => {
		const mockBack = vi.fn();
		(useRouter as any).mockReturnValue({ back: mockBack });

		const user = userEvent.setup();
		render(<BackButton />);

		const button = screen.getByRole('button', { name: /go back/i });
		await user.click(button);

		expect(mockBack).toHaveBeenCalledTimes(1);
	});
});
