import { test, expect } from '@playwright/test';

test.describe('Daily Digest Search & Navigation', () => {
	test('user can search for news and view an article', async ({ page }) => {
		// 1. Go to page and wait until 'networkidle' (all JS is loaded/parsed)
		await page.goto('/', { waitUntil: 'networkidle' });

		// 2. Locate elements
		const searchInput = page.getByRole('textbox').first();
		const searchButton = page.getByRole('button').first();

		// 3. Fill the input and force a small wait to allow state updates
		await searchInput.fill('horses');

		// 4. Force WebKit to realize the input has changed
		await searchInput.dispatchEvent('change');

		// 5. Click the button and wait for the URL change
		await searchButton.click();

		// 6. Assert URL - increase timeout for WebKit's slower cold starts
		await expect(page).toHaveURL(/search/, { timeout: 10000 });
		await expect(page).toHaveURL(/q=horses/);

		// 7. Verify results appear
		const articleLink = page.locator('a[href^="/article/"]').first();
		await expect(articleLink).toBeVisible();
	});

	test('responsive ticker is visible and contains items', async ({
		page,
	}) => {
		await page.goto('/');
		const ticker = page
			.locator('div.fixed')
			.filter({ hasText: 'Breaking' });
		await expect(ticker).toBeVisible();

		const box = await ticker.boundingBox();
		const viewport = page.viewportSize();

		if (box && viewport) {
			// Robust check: Is the top of the ticker in the bottom 20% of the screen?
			expect(box.y).toBeGreaterThan(viewport.height * 0.8);
		}
	});
});
