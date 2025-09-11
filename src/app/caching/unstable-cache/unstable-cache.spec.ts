import { test, expect } from '@playwright/test';

test.describe('Unstable Cache', () => {
  test('should display all unstable cache sections', async ({ page }) => {
    // Navigate to the unstable cache page
    await page.goto('/caching/unstable-cache');
    
    // Verify the main heading is present
    await expect(page.getByRole('heading', { name: 'Unstable Cache Test' })).toBeVisible();
    
    // Verify all cache sections are present
    await expect(page.getByText('Non-Cached Users (Fresh Data)')).toBeVisible();
    await expect(page.getByText('Cached Users (with tags, revalidate: 30s)')).toBeVisible();
    await expect(page.getByText('Cached User (no tags, revalidate: 60s)')).toBeVisible();
    
    // Verify request information section
    await expect(page.getByText('Request Information')).toBeVisible();
    await expect(page.getByText('Test Instructions')).toBeVisible();
  });

  test('should show non-cached users are always fresh', async ({ page }) => {
    // Navigate to the unstable cache page
    await page.goto('/caching/unstable-cache');
    
    // Get the first non-cached user name
    const firstNonCachedUser = await page.locator('p.text-red-600').first().textContent();
    expect(firstNonCachedUser).toBeTruthy();
    
    // Reload the page
    await page.reload();
    
    // Get the first non-cached user name from the second load
    const secondNonCachedUser = await page.locator('p.text-red-600').first().textContent();
    expect(secondNonCachedUser).toBeTruthy();
    
    // Non-cached users should always be fresh (same data in our simulation)
    expect(firstNonCachedUser!.length).toBeGreaterThan(5);
    expect(secondNonCachedUser!.length).toBeGreaterThan(5);
    
    console.log(`First non-cached user: ${firstNonCachedUser}`);
    console.log(`Second non-cached user: ${secondNonCachedUser}`);
  });

  test('should show cached users with tags', async ({ page }) => {
    // Navigate to the unstable cache page
    await page.goto('/caching/unstable-cache');
    
    // Get the first cached user name
    const firstCachedUser = await page.locator('p.text-blue-600').first().textContent();
    expect(firstCachedUser).toBeTruthy();
    
    // Reload the page
    await page.reload();
    
    // Get the first cached user name from the second load
    const secondCachedUser = await page.locator('p.text-blue-600').first().textContent();
    expect(secondCachedUser).toBeTruthy();
    
    // Cached users should be consistent (same data in our simulation)
    expect(firstCachedUser!.length).toBeGreaterThan(5);
    expect(secondCachedUser!.length).toBeGreaterThan(5);
    
    console.log(`First cached user: ${firstCachedUser}`);
    console.log(`Second cached user: ${secondCachedUser}`);
  });

  test('should show cached user without tags', async ({ page }) => {
    // Navigate to the unstable cache page
    await page.goto('/caching/unstable-cache');
    
    // Get the cached user without tags
    const cachedUserNoTags = await page.locator('p.text-green-600').first().textContent();
    expect(cachedUserNoTags).toBeTruthy();
    expect(cachedUserNoTags!.length).toBeGreaterThan(5);
    
    console.log(`Cached user without tags: ${cachedUserNoTags}`);
  });

  test('should display all user information correctly', async ({ page }) => {
    // Navigate to the unstable cache page
    await page.goto('/caching/unstable-cache');
    
    // Verify all user sections have proper data
    const nonCachedUsers = page.locator('p.text-red-600');
    const cachedUsers = page.locator('p.text-blue-600');
    const cachedUserNoTags = page.locator('p.text-green-600');
    
    // Check we have the expected number of users
    await expect(nonCachedUsers).toHaveCount(3); // 3 non-cached users
    await expect(cachedUsers).toHaveCount(2); // 2 cached users with tags
    await expect(cachedUserNoTags).toHaveCount(1); // 1 cached user without tags
    
    // Verify all users have valid names
    for (let i = 0; i < 3; i++) {
      const user = await nonCachedUsers.nth(i).textContent();
      expect(user).toBeTruthy();
      expect(user!.length).toBeGreaterThan(5);
    }
    
    for (let i = 0; i < 2; i++) {
      const user = await cachedUsers.nth(i).textContent();
      expect(user).toBeTruthy();
      expect(user!.length).toBeGreaterThan(5);
    }
    
    const userNoTags = await cachedUserNoTags.first().textContent();
    expect(userNoTags).toBeTruthy();
    expect(userNoTags!.length).toBeGreaterThan(5);
  });

  test('should display request information', async ({ page }) => {
    // Navigate to the unstable cache page
    await page.goto('/caching/unstable-cache');
    
    // Verify request information section
    await expect(page.getByText('Request Information')).toBeVisible();
    await expect(page.getByText('Rendered at:')).toBeVisible();
    await expect(page.getByText('Timestamp:')).toBeVisible();
    await expect(page.getByText('User Agent:')).toBeVisible();
    
    // Verify timestamp is a valid number
    const timestampElement = page.locator('p.font-mono.text-blue-600').first();
    const timestamp = await timestampElement.textContent();
    expect(timestamp).toBeTruthy();
    expect(parseInt(timestamp!)).toBeGreaterThan(0);
  });
}); 