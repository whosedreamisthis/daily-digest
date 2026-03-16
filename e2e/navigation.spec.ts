import { test, expect } from '@playwright/test';

test.describe('Navigation & Categories', () => {
	test('user can filter by category and scroll the bar', async ({ page }) => {
		await page.goto('/');

		// 1. Verify categories are visible
		const categoryBar = page.getByRole('navigation').first();
		await expect(categoryBar).toBeVisible();

		// 2. Click a category (e.g., Technology)
		const techTab = page.getByRole('link', { name: /technology/i });
		await techTab.click();

		// 3. Assert URL and Page Heading
		await expect(page).toHaveURL(/\/news\/technology/);
		await expect(page.locator('h1')).toContainText(/technology/i);
	});

	test('header remains sticky while scrolling feed', async ({ page }) => {
		await page.goto('/');

		const header = page.locator('header');

		// Scroll down significantly
		await page.evaluate(() => window.scrollBy(0, 1000));

		// In Playwright, this checks if the element is in the current viewport
		// perfect for testing 'sticky' or 'fixed' positions
		await expect(header).toBeInViewport();
	});
});
