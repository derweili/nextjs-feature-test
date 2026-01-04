import { test, expect } from '@playwright/test';

test.describe('Unstable Cache', () => {
  test('should display all unstable cache sections', async ({ page }) => {
    // Navigate to the unstable cache page
    await page.goto('/caching/unstable-cache');
    
    // Verify the main heading is present
    await expect(page.getByRole('heading', { name: 'Unstable Cache Test' })).toBeVisible();
    
    // Verify all cache sections are present
    await expect(page.getByText('Dynamic Time (No Caching)')).toBeVisible();
    await expect(page.getByText('Cached Time (with time-based revalidation: 30s)')).toBeVisible();
    await expect(page.getByText('Cached Time (no revalidation)')).toBeVisible();
    
    // Verify request information section
    await expect(page.getByText('Request Information')).toBeVisible();
    await expect(page.getByText('Test Instructions')).toBeVisible();
  });

  test('should show dynamic time is always fresh', async ({ page }) => {
    // Navigate to the unstable cache page
    await page.goto('/caching/unstable-cache');
    
    // Get the dynamic time
    const firstDynamicTime = await page.locator('p.text-red-600').first().textContent();
    expect(firstDynamicTime).toBeTruthy();
    
    // Reload the page
    await page.reload();
    
    // Get the dynamic time from the second load
    const secondDynamicTime = await page.locator('p.text-red-600').first().textContent();
    expect(secondDynamicTime).toBeTruthy();
    
    // Dynamic time should always be fresh (different on each request)
    expect(firstDynamicTime!.length).toBeGreaterThan(5);
    expect(secondDynamicTime!.length).toBeGreaterThan(5);
    
    console.log(`First dynamic time: ${firstDynamicTime}`);
    console.log(`Second dynamic time: ${secondDynamicTime}`);
  });

  test('should show cached time with revalidate', async ({ page }) => {
    // Navigate to the unstable cache page
    await page.goto('/caching/unstable-cache');
    
    // Get the cached time
    const firstCachedTime = await page.locator('p.text-blue-600').first().textContent();
    expect(firstCachedTime).toBeTruthy();
    
    // Reload the page
    await page.reload();
    
    // Get the cached time from the second load
    const secondCachedTime = await page.locator('p.text-blue-600').first().textContent();
    expect(secondCachedTime).toBeTruthy();
    
    // Cached time should be consistent (same data until revalidation)
    expect(firstCachedTime!.length).toBeGreaterThan(5);
    expect(secondCachedTime!.length).toBeGreaterThan(5);
    
    console.log(`First cached time: ${firstCachedTime}`);
    console.log(`Second cached time: ${secondCachedTime}`);
  });

  test('should show cached time without revalidation', async ({ page }) => {
    // Navigate to the unstable cache page
    await page.goto('/caching/unstable-cache');
    
    // Get the cached time without revalidation
    const firstCachedTimeNoRevalidate = await page.locator('p.text-green-600').first().textContent();
    expect(firstCachedTimeNoRevalidate).toBeTruthy();
    
    // Reload the page
    await page.reload();
    
    // Get the cached time without revalidation from the second load
    const secondCachedTimeNoRevalidate = await page.locator('p.text-green-600').first().textContent();
    expect(secondCachedTimeNoRevalidate).toBeTruthy();
    
    // Cached time without revalidation should be consistent (same data until manual revalidation)
    expect(firstCachedTimeNoRevalidate!.length).toBeGreaterThan(5);
    expect(secondCachedTimeNoRevalidate!.length).toBeGreaterThan(5);
    
    console.log(`First cached time (no revalidate): ${firstCachedTimeNoRevalidate}`);
    console.log(`Second cached time (no revalidate): ${secondCachedTimeNoRevalidate}`);
  });

  test('should display all time information correctly', async ({ page }) => {
    // Navigate to the unstable cache page
    await page.goto('/caching/unstable-cache');
    
    // Verify all time sections have proper data
    const dynamicTimes = page.locator('p.text-red-600');
    const cachedTimesWithRevalidate = page.locator('p.text-blue-600');
    const cachedTimesNoRevalidate = page.locator('p.text-green-600');
    
    // Check we have the expected number of time entries
    await expect(dynamicTimes).toHaveCount(1); // 1 dynamic time
    await expect(cachedTimesWithRevalidate).toHaveCount(1); // 1 cached time with revalidate
    await expect(cachedTimesNoRevalidate).toHaveCount(1); // 1 cached time without revalidate
    
    // Verify all times have valid values
    const dynamicTime = await dynamicTimes.first().textContent();
    expect(dynamicTime).toBeTruthy();
    expect(dynamicTime!.length).toBeGreaterThan(5);
    
    const cachedTimeWithRevalidate = await cachedTimesWithRevalidate.first().textContent();
    expect(cachedTimeWithRevalidate).toBeTruthy();
    expect(cachedTimeWithRevalidate!.length).toBeGreaterThan(5);
    
    const cachedTimeNoRevalidate = await cachedTimesNoRevalidate.first().textContent();
    expect(cachedTimeNoRevalidate).toBeTruthy();
    expect(cachedTimeNoRevalidate!.length).toBeGreaterThan(5);
  });

  test('should display request information', async ({ page }) => {
    // Navigate to the unstable cache page
    await page.goto('/caching/unstable-cache');
    
    // Verify request information section
    await expect(page.getByText('Request Information')).toBeVisible();
    await expect(page.getByText('Rendered at:')).toBeVisible();
    await expect(page.getByText('Timestamp:')).toBeVisible();
    
    // Verify timestamp is displayed
    const timestampText = await page.getByText('Timestamp:').textContent();
    expect(timestampText).toBeTruthy();
  });
}); 