import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Global mock for Next.js navigation
vi.mock('next/navigation', () => ({
	useRouter: () => ({
		back: vi.fn(),
		forward: vi.fn(),
		push: vi.fn(),
		replace: vi.fn(),
	}),
}));
