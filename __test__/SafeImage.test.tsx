import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SafeImage from '@/components/SafeImage';

vi.mock('next/image', () => ({
	__esModule: true,
	default: (props: any) => {
		return <img {...props} />;
	},
}));

describe('SafeImage Component', () => {
	const testSrc = 'https://example.com/good-image.jpg';
	const fallbackSrc = '/images/placeholder-v2.jpg';
	const testAlt = 'News article thumbnail';

	beforeEach(() => {
		vi.stubGlobal(
			'Image',
			class {
				onload: () => void = () => {};
				onerror: () => void = () => {};
				src: string = '';
				constructor() {
					setTimeout(() => this.onload(), 0); // Trigger success on next tick
				}
			},
		);
	});

	it('renders with the initial source URL', async () => {
		render(<SafeImage src={testSrc} alt={testAlt} />);

		await waitFor(() => {
			const img = screen.getByRole('img');
			expect(img.getAttribute('src')).toBe(testSrc);
		});
	});

	it('switches to the fallback image when the source fails to load', async () => {
		vi.stubGlobal(
			'Image',
			class {
				onerror: () => void = () => {};
				set src(value: string) {
					setTimeout(() => this.onerror(), 0);
				}
			},
		);

		render(<SafeImage src="https://broken.com/404.jpg" alt={testAlt} />);

		await waitFor(() => {
			const img = screen.getByRole('img');
			expect(img.getAttribute('src')).toBe(fallbackSrc);
		});
	});
});
